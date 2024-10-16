const { LocalAuth, Client } = require('whatsapp-web.js');

const client = new Client({
                authStrategy: new LocalAuth({ dataPath: "./session" }),
                webVersionCache: {
                    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.3000.1015364300-alpha.html',
                    type: 'remote'
                },
                puppeteer: {
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox']
                },
});

// client initialize does not finish at ready now.
client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

let pairingCodeRequested = false;
client.on('qr', async (qr) => {
    if (!pairingCodeRequested) {
        const pairingCode = await client.requestPairingCode('48699554616'); // enter the target phone number
        console.log('Pairing code enabled, code: '+ pairingCode);
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
    console.log('MESSAGE RECEIVED', msg.body);
    let chat = await msg.getChat();
    
    if (msg.body.startsWith('/join ')) {
      if (!chat.isGroup) {
          const inviteCode = msg.body.split(' ')[1].replace("https://chat.whatsapp.com/", "");
          try {
            await client.acceptInvite(inviteCode);
            msg.reply('Joined the group!');
          }
          catch (e) {
            msg.reply("Couldn't join the group. Check the invite link and try again...");
          }
        }
      else {
            msg.reply("Don't use this command in a group.");
      }
    } 
    
    else if (msg.body === '/exit') {
        if (chat.isGroup) {
            msg.reply("Bye👋👋");
            chat.leave();
        } else {
            msg.reply('This command can only be used in a group!');
        }
    }

      else if(msg.body === '/status') {
            msg.reply("I'm alive😁");
      }

    else if (msg.body.startsWith('/tagall ')) {        
        if (chat.isGroup) {
            let mentions = [];
            let text = msg.body.replace("/tagall ", "");
                                        
            for (let participant of chat.participants) {
                const contact = await client.getContactById(participant.id._serialized);
                mentions.push(contact);
            }
            chat.sendMessage(text, { mentions });
        }
        else {
            msg.reply('This command can only be used in a group!');
        }
    }
    else if(msg.body.startsWith('/chat ')) {
        let a = msg.body.replace("/chat ", "");
        let res = await prompt(a);
        await msg.reply(res);
    }
});

client.on("message_create", async(msg) => {
    let chat = await msg.getChat();
    if(msg.body === "/link") {
    msg.reply(chat.getInviteCode());
    }
});

const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

    res.setHeader('Content-Type', 'text/html');
    res.writeHead(200);
    res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple HTTPS Server</title>
    </head>
    <body>
        <h1>Hello, HTTPS with HTML!</h1>
        <p>This is a simple HTTPS server that returns an HTML response.</p>
    </body>
    </html>
  `);
});

const PORT = 4433;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

setInterval(() => {
    http.get(`http://localhost:${PORT}`, (res) => {
        console.log(`Keep-alive request sent, status code: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });
}, 5000);
