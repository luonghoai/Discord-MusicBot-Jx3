const { MessageEmbed } = require("discord.js");
const discordTTS = require("discord-tts");

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
    try {
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
        broadcast.play(
          discordTTS.getVoiceStream(cmd, { lang: "vi", slow: false })
        );
        const dispatcher = connection.play(broadcast);
      });
    } catch (err) {
      console.log(err);
    }
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
      try {
        const guild = client.guilds.cache.get(interaction.guild_id);
        const member = guild.members.cache.get(interaction.member.user.id);
        if (!member.voice.channel)
          return client.sendTime(
            interaction,
            "❌ | **Vào room đi rồi hẵn buông lời dơ bửn!!!**"
          );
        if (
          guild.me.voice.channel &&
          !guild.me.voice.channel.equals(member.voice.channel)
        )
          return client.sendTime(
            interaction,
            "❌ | **Vào room đi rồi hẵn buông lời dơ bửn!!!**"
          );
        let cmd = args[0].value;
        if (!cmd)
          return client.sendTime(interaction, `❌ | Nói gì đó dơ bửn đi :">`);
        const channelId = member.voice.channelID;
        const channel = client.channels.cache.get(channelId);
        channel
          .join()
          .then((connection) => {
            const dispatcher = connection.play(
              discordTTS.getVoiceStream(cmd, { lang: "vi", slow: false })
            );
            dispatcher.on("finish", () => {
              channel.leave();
            });
          })
          .then(() => {
            return client.sendTime(
              interaction,
              `❌ | ${cmd} |**Nói xong ròi out nha!!!**`
            );
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
