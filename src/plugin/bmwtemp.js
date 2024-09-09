import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import fetch from 'node-fetch'; 
import config from '../../config.cjs';

const tempMailCommand = async (m, Matrix) => {
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

    let selectedListId;
    const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
    const interactiveResponseMessage = m?.message?.interactiveResponseMessage;

    if (interactiveResponseMessage) {
        const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
        if (paramsJson) {
            const params = JSON.parse(paramsJson);
            selectedListId = params.id;
        }
    }

    const selectedId = selectedListId || selectedButtonId;

    if (cmd === 'tempmail') {
        try {
            await m.React("🕘");

            // Generate temporary email
            const genResponse = await fetch('https://tempmail.apinepdev.workers.dev/api/gen');
            const genData = await genResponse.json();

            if (!genData.email) {
                m.reply('Failed to generate temporary email.');
                await m.React("❌");
                return;
            }

            const tempEmail = genData.email;

            const buttons = [
                {
                    "name": "cta_copy",
                    "buttonParamsJson": JSON.stringify({
                        "display_text": "Copy Email",
                        "id": "copy_email",
                        "copy_code": tempEmail
                    })
                },
                {
                    "name": "quick_reply",
                    "buttonParamsJson": JSON.stringify({
                        "display_text": "Check Inbox",
                        "id": `check_inbox_${tempEmail}`
                    })
                }
            ];

            const msg = generateWAMessageFromContent(m.from, {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: `Generated Temporary Email: ${tempEmail}`
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: "© Powered By BMW MD"
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: "Temporary Email",
                                gifPlayback: true,
                                subtitle: "",
                                hasMediaAttachment: false
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons
                            }),
                            contextInfo: {
                                mentionedJid: [m.sender],
                                forwardingScore: 9999,
                                isForwarded: true,
                            }
                        }),
                    },
                },
            }, {});

            const sentMsg = await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
                messageId: msg.key.id
            });
            await m.React("✅");

        } catch (error) {
            console.error("Error processing your request:", error);
            m.reply('Error processing your request.');
            await m.React("❌");
        }
    } else if (selectedId && selectedId.startsWith('check_inbox_')) {
        // Extract email from the selectedId
        const email = selectedId.slice('check_inbox_'.length);

        try {
            await m.React("🕘");

            // Check inbox for the provided email
            const inboxResponse = await fetch(`https://tempmail.apinepdev.workers.dev/api/getmessage?email=${email}`);
            const inboxData = await inboxResponse.json();

            let inboxMessages;
            let buttons = [];

            if (inboxData.messages && inboxData.messages.length > 0) {
                inboxMessages = 'Inbox Messages:\n\n';
                inboxData.messages.forEach((msg, index) => {
                    const message = JSON.parse(msg.message);
                    inboxMessages += `${index + 1}. From: ${msg.sender}\nSubject: ${msg.subject}\nDate: ${new Date(message.date).toLocaleString()}\nMessage: ${message.body}\n\n`;

                    const emailBody = message.textBody || ''; // Using message.textBody from the parsed message
                    const otpMatch = emailBody.match(/\b\d{4,6}\b/); // Simple regex to find 4-6 digit codes
                    if (otpMatch) {
                        buttons.push({
                            "name": "cta_copy",
                            "buttonParamsJson": JSON.stringify({
                                "display_text": "Copy OTP",
                                "id": "copy_otp",
                                "copy_code": otpMatch[0]
                            })
                        });
                    }
                });
            } else {
                inboxMessages = 'No messages found in the inbox.';
            }

            buttons.push({
                "name": "quick_reply",
                "buttonParamsJson": JSON.stringify({
                    "display_text": "Check Inbox Again",
                    "id": `check_inbox_${email}`
                })
            });

            const updatedMsg = generateWAMessageFromContent(m.from, {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: inboxMessages
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: "© Powered By BMW MD"
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                title: "",
                                gifPlayback: true,
                                subtitle: "",
                                hasMediaAttachment: false
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons
                            }),
                            contextInfo: {
                                mentionedJid: [m.sender],
                                forwardingScore: 9999,
                                isForwarded: true,
                            }
                        }),
                    },
                },
            }, {});

            await Matrix.relayMessage(updatedMsg.key.remoteJid, updatedMsg.message, {
                messageId: updatedMsg.key.id
            });
            await m.React("✅");

        } catch (error) {
            console.error("Error processing your request:", error);
            m.reply('Error processing your request.');
            await m.React("❌");
        }
    } else {
    }
};

export default tempMailCommand;
