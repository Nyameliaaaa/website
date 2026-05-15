import type { Packet } from '@/lib/types';
import {
	APIActionRowComponent,
	APIButtonComponent,
	APIButtonComponentWithCustomId,
	APIChatInputApplicationCommandInteraction,
	APIComponentInMessageActionRow,
	APIInteraction,
	APIMessageTopLevelComponent,
	APIModalSubmissionComponent,
	APIModalSubmitTextInputComponent,
	ComponentType,
	InteractionType,
	ModalSubmitComponent,
	ModalSubmitLabelComponent,
} from 'discord-api-types/v10';
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

export const sendDiscordPacket = async <T extends Packet>(c: Context<{ Bindings: Bindings }>, object: T) => {
	await c.env.DISCORD_SEND_QUEUE.send({
		workerUrl: new URL(c.req.raw.url).origin,
		...object,
	} as T);
};

export const isLabel = (data?: APIModalSubmissionComponent): data is ModalSubmitLabelComponent => {
	return (data && 'type' in data && data.type === ComponentType.Label) ?? false;
};

export const isTextInput = (data: ModalSubmitComponent): data is APIModalSubmitTextInputComponent => {
	return data.type === ComponentType.TextInput;
};

export const isActionRow = (
	data: APIMessageTopLevelComponent
): data is APIActionRowComponent<APIComponentInMessageActionRow> => {
	return data.type === ComponentType.ActionRow;
};
export const isButton = (data: APIComponentInMessageActionRow): data is APIButtonComponent => {
	return data.type === ComponentType.Button;
};

export const isButtonWithCustomID = (data: APIComponentInMessageActionRow): data is APIButtonComponentWithCustomId => {
	return data.type === ComponentType.Button && 'custom_id' in data;
};

export const isSlashCommand = (data: APIInteraction): data is APIChatInputApplicationCommandInteraction => {
	return data.type === InteractionType.ApplicationCommand;
};

export const disableDelete = (component: APIMessageTopLevelComponent) => {
	if (!isActionRow(component)) {
		return component;
	}

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
};
