import { CreateContactOptions, Resend } from 'resend';


const APIKEY = process.env.RESEND_API_KEY
const resend = new Resend(APIKEY);

const BLOCKED_DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'aol.com',
  'icloud.com',
  'protonmail.com',
  'mail.com'
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  const domain = email.split('@')[1]?.toLowerCase();

  if (BLOCKED_DOMAINS.includes(domain)) {
    return res.status(400).json({ error: 'Please use your business email address' });
  }

  const firstName =( email.split('@')[0]||'-')

  const options:CreateContactOptions = {
    email,
    firstName: firstName,
    unsubscribed: false,
    audienceId: 'waitlist'
  }

  console.log('WaitList', APIKEY, options )

  resend.contacts.create(options)
  .then((data)=>{
    console.log('Contact', data)
  }).catch((error)=>{
    console.error('Waitlist error:', error); 
  })

  try {

    resend.emails.send({
      from: 'PitchForge <onboarding@pitch-forge.com>',
      to: email,
      subject: 'Welcome to our Waitlist!',
      html: `<h2>You're on the list!</h2> <p>Thanks for joining our waitlist.</p><p>🎉 You've qualified for our 50% lifetime discount!</p> <p>We'll notify you when we launch.</p>`
    }).then((emailInfo)=>{
      res.status(200).json({ success: true });
    }).catch((error)=>{
      console.error('Waitlist error:', error);
      res.status(500).json({ error: 'Failed to join waitlist' });
    })

    
  } catch (error) {
    console.error('Waitlist error:', error);
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
}