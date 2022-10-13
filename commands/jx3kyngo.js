const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const axios = require("axios");

module.exports = {
  name: "jx3kyngo",
  description: "Tìm điều kiện kích hoạt kỳ ngộ",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["jkn"],
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
      .setFooter(`❌ | Không tìm thấy dữ liệu phù hợp`)
      .setDescription(`Sử dụng lệnh: jx3kyngo <Tên kỳ ngộ>`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd = args[0].value;
      if (!cmd)
        return client.sendTime(
          interaction,
          `❌ | Không tìm thấy dữ liệu phù hợp`
        );

      const sendPostRequest = async (interaction) => {
        try {
          const resp = await axios.post(
            "https://www.jx3api.com/data/lucky/sub/require",
            {
              name: `${cmd}`,
            }
          );
          const data = resp.data.data;
          let embed = new MessageEmbed()
            .setAuthor(`Tên kỳ ngộ: ${cmd}`, client.botconfig.IconURL)
            .setColor("GREEN")
            .addField("Cách xuất phát kỳ ngộ:", `${data.means}`)
            .addField("Điều kiện cần để xuất phát kỳ ngộ:", `${data.require}`)
            .addField("Điều kiện bổ sung:", `${data.maybe}`)
            .addField("Phần thưởng:", `${data.reward}`)
            .setImage(`${data.upload}`);
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
        name: "jx3kyngo",
        value: "Tên kỳ ngộ",
        type: 3,
        required: true,
        description: "Nhập tên kỳ ngộ muốn kích hoạt",
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
        .setFooter(`❌ | Không tìm thấy dữ liệu phù hợp`)
        .setDescription(`Sử dụng lệnh: jx3kyngo <Tên kỳ ngộ>`);

      if (!args) return interaction.send(Embed);
      else {
        let cmd = args[0].value;
        if (!cmd)
          return client.sendTime(
            interaction,
            `❌ | Không tìm thấy dữ liệu phù hợp`
          );

        const sendPostRequest = async (interaction) => {
          try {
            const resp = await axios.post(
              "https://www.jx3api.com/data/lucky/sub/require",
              {
                name: `${cmd}`,
              }
            );
            const data = resp.data.data;
            let embed = new MessageEmbed()
              .setAuthor(`Tên kỳ ngộ: ${cmd}`, client.botconfig.IconURL)
              .setColor("GREEN")
              .addField("Cách xuất phát kỳ ngộ:", `${data.means}`)
              .addField("Điều kiện cần để xuất phát kỳ ngộ:", `${data.require}`)
              .addField("Điều kiện bổ sung:", `${data.maybe}`)
              .addField("Phần thưởng:", `${data.reward}`)
              .setImage(`${data.upload}`);
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
