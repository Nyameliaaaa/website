import { Packet, PacketType } from '@/types/packets';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ContainerBuilder,
	EmbedBuilder,
	SeparatorBuilder,
	TextDisplayBuilder,
} from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { COLOR_VALUES } from '@website/lib';
import { ButtonStyle } from 'discord-api-types/payloads/v10';
import { Routes } from 'discord-api-types/rest/v10';
import { COMPONENTS_V2, CONTACT_CHANNEL_ID, NEW_GUESTBOOK_ENTRY_CHANNEL_ID, REPORT_CHANNEL_ID } from './lib/consts';

export const queue: ExportedHandlerQueueHandler<Cloudflare.Env, Packet> = async (batch, env) => {
	const rest = new REST({ version: '10' }).setToken(env.DISCORD_TOKEN);

	for (const message of batch.messages) {
		const { body } = message;

		switch (body.type) {
			case PacketType.GuestbookEntry: {
				const { data } = body;

				const container = new ContainerBuilder()
					.setAccentColor(COLOR_VALUES[data.borderColor ?? 'pink'])
					.addTextDisplayComponents(new TextDisplayBuilder().setContent(`## ${data.name}\n${data.message}`))
					.addSeparatorComponents(new SeparatorBuilder())
					.addTextDisplayComponents(
						new TextDisplayBuilder().setContent(
							[data.url && `**url** ${data.url}`, data.email && `**email** ${data.email}`, `#${data.id}`]
								.filter(Boolean)
								.join('\n')
						)
					)
					.addActionRowComponents(
						new ActionRowBuilder<ButtonBuilder>().addComponents([
							new ButtonBuilder()
								.setCustomId(`guestbookEntry:reply:${data.id}`)
								.setLabel('reply')
								.setStyle(ButtonStyle.Primary),
							new ButtonBuilder()
								.setCustomId(`guestbookEntry:delete:${data.id}`)
								.setLabel('delete')
								.setStyle(ButtonStyle.Danger),
							...(data.url ? [new ButtonBuilder().setLabel('site').setStyle(ButtonStyle.Link).setURL(data.url)] : []),
							...(data.email
								? [
										new ButtonBuilder()
											.setLabel('mail')
											.setStyle(ButtonStyle.Link)
											.setURL(`${body.workerUrl}/api/message/mail?to=${data.email}&subject=your%20guestbook%20signing`),
									]
								: []),
						])
					);

				await rest.post(Routes.channelMessages(NEW_GUESTBOOK_ENTRY_CHANNEL_ID), {
					body: { components: [container], flags: COMPONENTS_V2 },
				});

				message.ack();
				break;
			}

			case PacketType.Report: {
				const { data } = body;
				const { report, offendingEntry } = data;

				const container = new ContainerBuilder()
					.setAccentColor(COLOR_VALUES[offendingEntry.borderColor ?? 'pink'])
					.addTextDisplayComponents(new TextDisplayBuilder().setContent(`## new report\n${report.message}`))
					.addSeparatorComponents(new SeparatorBuilder())
					.addTextDisplayComponents(
						new TextDisplayBuilder().setContent(
							[
								`## ${offendingEntry.name}\n${offendingEntry.message}`,
								offendingEntry.url && `**url** ${offendingEntry.url}`,
								offendingEntry.email && `**email** ${offendingEntry.email}`,
								`#${offendingEntry.id}`,
							]
								.filter(Boolean)
								.join('\n')
						)
					)
					.addActionRowComponents(
						new ActionRowBuilder<ButtonBuilder>().addComponents([
							new ButtonBuilder()
								.setCustomId(`guestbookEntry:delete:${offendingEntry.id}`)
								.setLabel('delete')
								.setStyle(ButtonStyle.Danger),
							...(offendingEntry.url
								? [new ButtonBuilder().setLabel('site').setStyle(ButtonStyle.Link).setURL(offendingEntry.url)]
								: []),
							...(offendingEntry.email
								? [
										new ButtonBuilder()
											.setLabel('mail')
											.setStyle(ButtonStyle.Link)
											.setURL(`${body.workerUrl}/api/message/mail?to=${offendingEntry.email}`),
									]
								: []),
						])
					);

				await rest.post(Routes.channelMessages(REPORT_CHANNEL_ID), {
					body: { components: [container], flags: COMPONENTS_V2 },
				});

				message.ack();
				break;
			}

			case PacketType.Message: {
				const { data } = body;

				const embed = new EmbedBuilder()
					.setTitle(data.name)
					.setDescription(data.message)
					.setAuthor({ name: 'new message ^^' })
					.setFields({ name: 'email', value: data.email })
					.setColor(COLOR_VALUES.pink);

				const actionRow = new ActionRowBuilder().addComponents([
					new ButtonBuilder()
						.setLabel('reply')
						.setStyle(ButtonStyle.Link)
						.setURL(`${body.workerUrl}/api/message/mail?to=${data.email}`),
				]);

				const container = new ContainerBuilder()
					.setAccentColor(COLOR_VALUES['pink'])
					.addTextDisplayComponents(new TextDisplayBuilder().setContent(`### new message`))
					.addSeparatorComponents(new SeparatorBuilder())
					.addTextDisplayComponents(new TextDisplayBuilder().setContent(`## ${data.subject}\n${data.message}`))
					.addSeparatorComponents(new SeparatorBuilder())
					.addTextDisplayComponents(
						new TextDisplayBuilder().setContent(`**name**: ${data.name}\n**email**: ${data.email}`)
					)
					.addActionRowComponents(
						new ActionRowBuilder<ButtonBuilder>().addComponents(
							new ButtonBuilder()
								.setLabel('reply')
								.setStyle(ButtonStyle.Link)
								.setURL(
									`${body.workerUrl}/api/message/mail?to=${data.email}&subject=${encodeURIComponent(data.subject)}`
								)
						)
					);

				await rest.post(Routes.channelMessages(CONTACT_CHANNEL_ID), {
					body: { components: [container], flags: COMPONENTS_V2 },
				});

				message.ack();
				break;
			}
		}
	}
};
