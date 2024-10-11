const { Client } = require('whatsapp-web.js');

const { createRequire } = require('module');
const require = createRequire(import.meta.url);

async function prompt(p) {
  const OpenAI = await import("openai");
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        {
            role: "user",
            content: p,
        },
    ],
  });

  return(completion.choices[0].message);
};

const client = new Client({
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
    console.log('QR RECEIVED', qr);

    if !pairingCodeRequested) {
        const pairingCode = await client.requestPairingCode('96170100100'); // enter the target phone number
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
    console.log('MESSAGE RECEIVED', msg);
    let chat = await msg.getChat();
    
    if (msg.body.startsWith('/join ')) {
      if (!chat.isGroup) {
          const inviteCode = msg.body.split(' ')[1];
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
            chat.leave();
        } else {
            msg.reply('This command can only be used in a group!');
        }
    }

  else if (msg.body.startsWith('/tagall ')) {        
        if (chat.isGroup) {
            let mentions = [];
            let text = msg.body.replace("/tagall ');
                                        
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
  else if(msg.body.startsWith('/chat ') {
      let a = msg.body.replace("/chat ");
      let res = prompt(a);
  }
});
