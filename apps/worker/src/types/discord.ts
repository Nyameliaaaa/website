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
