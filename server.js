const http = require('http');

// Create the HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, HTTP world!');
});

// Start the server
const PORT = 3000; // You can use any available port
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


const { Client } = require('whatsapp-web.js');

    const client = new Client({
        headless: 'false',
        webVersionCache: {
            remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1015364300-alpha.html',
            type: 'remote'
        },
        puppeteer: {
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        },
    });

    client.initialize();

    client.on('loading_screen', (percent, message) => {
        console.log('LOADING SCREEN', percent, message);
    });

    let pairingCodeRequested = false;
    client.on('qr', async (qr) => {
        if (!pairingCodeRequested) {
            const pairingCode = await client.requestPairingCode('48699554616'); // enter the target phone number
            console.log('Pairing code enabled, code: ' + pairingCode);
            pairingCodeRequested = true;
        }
    });

    client.on('authenticated', () => {
        console.log('AUTHENTICATED');
    });

    client.on('auth_failure', msg => {
        console.error('AUTHENTICATION FAILURE', msg);
    });

    client.on('ready', async () => {
        console.log('READY');
    });

    client.on('message', async msg => {
        let chat = await msg.getChat();

        if (msg.body.startsWith('/join ')) {
            console.log(msg.body);
            if (!chat.isGroup) {
                const inviteCode = msg.body.split(' ')[1].replace("https://chat.whatsapp.com/", "");
                try {
                    await client.acceptInvite(inviteCode);
                    msg.reply('Joined the group!');
                } catch (e) {
                    msg.reply("Couldn't join the group. Check the invite link and try again...");
                }
            } else {
                msg.reply("Don't use this command in a group.");
            }
        } else if (msg.body === '/exit') {
            console.log(msg.body);
            if (chat.isGroup) {
                msg.reply("Bye👋👋");
                chat.leave();
            } else {
                msg.reply('This command can only be used in a group!');
            }
        } else if (msg.body === '/status') {            
            console.log(msg.body);
            msg.reply("I'm alive😁");
        } else if (msg.body.startsWith('/tagall ')) {        
            console.log(msg.body);
            if (chat.isGroup) {
                let mentions = [];
                let text = msg.body.replace("/tagall ", "");

                for (let participant of chat.participants) {
                    const contact = await client.getContactById(participant.id._serialized);
                    mentions.push(contact);
                }
                chat.sendMessage(text, { mentions });
            } else {
                msg.reply('This command can only be used in a group!');
            }
        } else if (msg.body.startsWith('/chat ')) {
            let a = msg.body.replace("/chat ", "");
            let res = await prompt(a); // Ensure 'prompt' is defined
            await msg.reply(res);
        }
    });

    client.on("message_create", async (msg) => {
        let chat = await msg.getChat();
        if (msg.body === "/link") {
            msg.reply(chat.getInviteCode());
        }
    });
          
