import { isActionRow, isButtonWithCustomID, isContainer } from '@/types/discord';
import type { Packet } from '@/types/packets';
import type { APIMessageTopLevelComponent } from 'discord-api-types/v10';
import type { Context } from 'hono';

export const getOrigin = (origin: string) => {
	if (!origin) {
		return null;
	}

	const allowed = ['http://localhost:4321', 'https://nyamelia.pages.dev', 'https://nyamelia.is-immensely.gay'];
	const staging = /^https:\/\/[a-z0-9-]+\.nyamelia\.pages\.dev$/;
	const tunnel = /^https:\/\/[a-z0-9-]+\.trycloudflare\.com$/;

	if (allowed.includes(origin) || tunnel.test(origin) || staging.test(origin)) {
		return origin;
	}

	return null;
};

export const sendDiscordPacket = async <T extends Packet>(c: Context<{ Bindings: Cloudflare.Env }>, object: T) => {
	await c.env.DISCORD_SEND_QUEUE.send({
		workerUrl: new URL(c.req.raw.url).origin,
		...object,
	} as T);
};

export const disableDelete = (component: APIMessageTopLevelComponent) => {
	if (isContainer(component)) {
		return {
			...component,
			components: component.components.map(child => {
				if (!isActionRow(child)) return child;

				return {
					...child,
					components: child.components.map(button => {
						if (isButtonWithCustomID(button)) {
							const disabled =
								button.custom_id.startsWith('guestbookEntry:delete') ||
								button.custom_id.startsWith('guestbookEntry:reply');
							return { ...button, disabled };
						}
						return button;
					}),
				};
			}),
		};
	}

	// fallback for old non-v2 messages i guess
	if (isActionRow(component)) {
		return {
			...component,
			components: component.components.map(button => {
				if (isButtonWithCustomID(button)) {
					const disabled =
						button.custom_id.startsWith('guestbookEntry:delete') || button.custom_id.startsWith('guestbookEntry:reply');
					return { ...button, disabled };
				}
				return button;
			}),
		};
	}

	return component;
};
