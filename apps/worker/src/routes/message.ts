import { sendDiscordPacket } from '@/lib/helpers';
import { MessagePacket, PacketType } from '@/types/packets';
import { messageSchema, isValidEmail, POSTMessage, mailToSchema } from '@website/lib';
import { Hono } from 'hono';

const message = new Hono<{ Bindings: Cloudflare.Env }>();

message.post('/', async c => {
	const body = await c.req.json<POSTMessage>();
	const data = messageSchema.parse(body);

	await sendDiscordPacket<MessagePacket>(c, { type: PacketType.Message, data });
	return c.json({ success: true }, 201);
});

message.get('/mail', async c => {
	const data = mailToSchema.parse({
		to: c.req.query('to'),
		subject: c.req.query('subject'),
	});

	return c.redirect(`mailto:${data.to}?subject=${encodeURIComponent(`RE: ${data.subject ?? 'N/A'}`)}`);
});

export default message;
