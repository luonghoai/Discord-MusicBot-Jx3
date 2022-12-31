const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "jx3huongdankyngo",
  description: "Hướng dẫn làm kỳ ngộ",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["jhdk"],
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
      .setDescription(`Sử dụng lệnh: jx3huongdankyngo <Tên kỳ ngộ>`);
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
            "https://www.jx3api.com/data/lucky/sub/strategy",
            {
              name: `${cmd}`,
            }
          );
          const data = resp.data.data;
          let embed = new MessageEmbed()
            .setAuthor(`Tên kỳ ngộ: ${cmd}`, client.botconfig.IconURL)
            .setColor("GREEN")
            .addField("Tên nhiệm vụ:", `${data.class}`, true)
            .addField("Link chống mù:", `${data.url}`)
            .setImage(`${data.url}`);
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
        name: "jx3huongdankyngo",
        value: "Tên kỳ ngộ",
        type: 3,
        required: true,
        description: "Nhập tên kỳ ngộ",
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
        .setDescription(`Sử dụng lệnh: jx3huongdankyngo <Tên kỳ ngộ>`);

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
              "https://www.jx3api.com/data/lucky/sub/strategy",
              {
                name: `${cmd}`,
              }
            );
            const data = resp.data.data;
            let embed = new MessageEmbed()
              .setAuthor(`Tên kỳ ngộ: ${cmd}`, client.botconfig.IconURL)
              .setColor("GREEN")
              .addField("Tên nhiệm vụ:", `${data.class}`, true)
              .addField("Link chống mù:", `${data.url}`)
              .setImage(`${data.url}`);
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
