import { sendDiscordPacket } from '@/lib/helpers';
import { MessagePacket, PacketType } from '@/types/packets';
import { contactSchema, isValidEmail, POSTMessage } from '@website/lib';
import { Hono } from 'hono';

const message = new Hono<{ Bindings: Cloudflare.Env }>();

message.post('/', async c => {
	const body = await c.req.json<POSTMessage>();
	const data = contactSchema.parse(body);

	await sendDiscordPacket<MessagePacket>(c, { type: PacketType.Message, data });
	return c.json({ success: true }, 201);
});

message.get('/mail', async c => {
	const email = c.req.query('to');
	const subject = c.req.query('subject');

	if (!email) {
		return c.json(
			{
				error: 'NO_EMAIL',
				description: 'an email is required',
			},
			422
		);
	}

	if (!isValidEmail(email)) {
		return c.json(
			{
				error: 'INVALID_EMAIL',
				description: 'that email is not a valid email',
			},
			422
		);
	}

	return c.redirect(`mailto:${email}?subject=${encodeURIComponent(`RE: ${subject ?? 'N/A'}`)}`);
});

export default message;
