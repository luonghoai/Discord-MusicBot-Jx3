const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const axios = require("axios");

module.exports = {
  name: "jx3ngua",
  description: "Tìm vị trí bắt ngựa",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["jh"],
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
      .setDescription(`Sử dụng lệnh: jx3ngua <Tên con ngựa>`);
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
            "https://www.jx3api.com/data/useless/refresh",
            {
              name: `${cmd}`,
            }
          );
          const data = resp.data.data;
          let embed = new MessageEmbed()
            .setAuthor(`Tên ngựa cần tìm: ${cmd}`, client.botconfig.IconURL)
            .setColor("GREEN")
            .addField("Vị trí xuất hiện:", "");
          data.data.map((horse) => {
            embed.addField("Bản đồ:", `${horse.map}`);
            embed.addField("Vị trí:", `${horse.url}`);
            embed.setImage(`${horse.url}`);
          });
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
        name: "jx3ngua",
        value: "Tên ngựa",
        type: 3,
        required: true,
        description: "Nhập tên ngựa muốn tìm",
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
        .setDescription(`Sử dụng lệnh: jx3ngua <Tên con ngựa>`);

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
              "https://www.jx3api.com/data/useless/refresh",
              {
                name: `${cmd}`,
              }
            );
            const data = resp.data.data;
            let embed = new MessageEmbed()
              .setAuthor(`Tên ngựa cần tìm: ${cmd}`, client.botconfig.IconURL)
              .setColor("GREEN")
              .addField("Vị trí xuất hiện:", "");
            data.data.map((horse) => {
              embed.addField("Bản đồ:", `${horse.map}`);
              embed.addField("Vị trí:", `${horse.url}`);
              embed.setImage(`${horse.url}`);
            });
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
