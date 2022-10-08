const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const axios = require("axios");

module.exports = {
  name: "jx3macro",
  description: "Tìm macro + kỳ huyệt",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["jm"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Embed = new MessageEmbed()
      .setAuthor(
        `Commands of ${client.user.username}`,
        client.botconfig.IconURL
      )
      .setColor(client.botconfig.EmbedColor)
      .setFooter(`❌ | Không tìm thấy macro`)
      .setDescription(`Sử dụng lệnh: jx3macro <Tên tâm pháp>`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd = args[0].value;
      if (!cmd)
        return client.sendTime(interaction, `❌ | Không tìm thấy macro`);

      let data = {
        name: `${cmd}`,
      };

      const sendPostRequest = async (interaction) => {
        try {
          const resp = await axios.post(
            "https://api.jx3api.com/app/macro",
            data
          );
          const macro = resp.data.data;
          let embed = new MessageEmbed()
            .setAuthor(`Macro: ${cmd}`, client.botconfig.IconURL)
            .setColor("GREEN")
            .addField("Macro:", `${macro.macro}`)
            .addField("Kì huyệt:", `${macro.qixue}`);
          interaction.send(embed);
        } catch (err) {
          console.error(err);
        }
      };
      sendPostRequest(message.channel);
    }
  },

  SlashCommand: {
    options: [
      {
        name: "jx3macro",
        value: "Tên tâm pháp",
        type: 3,
        required: true,
        description: "Nhập tên tâm pháp của phái",
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
      let Embed = new MessageEmbed()
        .setAuthor(
          `Commands of ${client.user.username}`,
          client.botconfig.IconURL
        )
        .setColor(client.botconfig.EmbedColor)
        .setFooter(`❌ | Không tìm thấy macro`)
        .setDescription(`Sử dụng lệnh: jx3macro <Tên tâm pháp>`);

      if (!args) return interaction.send(Embed);
      else {
        let cmd = args[0].value;
        if (!cmd)
          return client.sendTime(interaction, `❌ | Không tìm thấy macro`);

        let data = {
          name: `${cmd}`,
        };

        const sendPostRequest = async (interaction) => {
          try {
            const resp = await axios.post(
              "https://api.jx3api.com/app/macro",
              data
            );
            const macro = resp.data.data;
            let embed = new MessageEmbed()
              .setAuthor(`Macro: ${cmd}`, client.botconfig.IconURL)
              .setColor("GREEN")
              .addField("Macro:", `${macro.macro}`)
              .addField("Kì huyệt:", `${macro.qixue}`);
            interaction.send(embed);
          } catch (err) {
            console.error(err);
          }
        };
        sendPostRequest(interaction);
      }
    },
  },
};
