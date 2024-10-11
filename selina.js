const { Client } = require('whatsapp-web.js');

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
});
