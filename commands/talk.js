const { MessageEmbed } = require("discord.js");
const discordTTS = require("discord-tts");
const axios = require("axios");

module.exports = {
  name: "talk",
  description: "Nói gì đó dơ bửn",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["ta"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Vào room đi rồi hẵn buông lời dơ bửn!!!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        "❌ | **Vào room đi rồi hẵn buông lời dơ bửn!!!**"
      );
    let cmd = args[0].value;
    if (!cmd)
      return client.sendTime(interaction, `❌ | Nói gì đó dơ bửn đi :">`);
    const broadcast = client.voice.createBroadcast();
    const channelId = msg.member.voice.channelID;
    const channel = client.channels.cache.get(channelId);
    channel.join().then((connection) => {
      broadcast.play(discordTTS.getVoiceStream(cmd));
      const dispatcher = connection.play(broadcast);
    });
  },

  SlashCommand: {
    options: [
      {
        name: "talk",
        value: "Lời dơ bửn",
        type: 3,
        required: true,
        description: "Nhập nội dung muốn nói lời dơ bửn",
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      if (!message.member.voice.channel)
        return client.sendTime(
          message.channel,
          "❌ | **Vào room đi rồi hẵn buông lời dơ bửn!!!**"
        );
      if (
        message.guild.me.voice.channel &&
        message.member.voice.channel.id !== message.guild.me.voice.channel.id
      )
        return client.sendTime(
          message.channel,
          "❌ | **Vào room đi rồi hẵn buông lời dơ bửn!!!**"
        );
      let cmd = args[0].value;
      if (!cmd)
        return client.sendTime(interaction, `❌ | Nói gì đó dơ bửn đi :">`);
      const broadcast = client.voice.createBroadcast();
      const channelId = msg.member.voice.channelID;
      const channel = client.channels.cache.get(channelId);
      channel.join().then((connection) => {
        broadcast.play(discordTTS.getVoiceStream(cmd));
        const dispatcher = connection.play(broadcast);
      });
    },
  },
};
