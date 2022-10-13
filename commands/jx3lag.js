const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const axios = require("axios");

module.exports = {
  name: "jx3lag",
  description: "Các loại lag khuyên dùng",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["jlg"],
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
      .setDescription(`Sử dụng lệnh: jx3lag <Tên tâm pháp>`);
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
            "https://www.jx3api.com/data/school/snacks",
            {
              name: `${cmd}`,
            }
          );
          const data = resp.data.data;
          let embed = new MessageEmbed()
            .setAuthor(`Tên tâm pháp: ${cmd}`, client.botconfig.IconURL)
            .setColor("GREEN")
            .addField("Tăng cường thực phẩm:", `${data.heighten_food}`)
            .addField("Phụ trợ thực phẩm:", `${data.auxiliary_food}`)
            .addField("Tăng cường dược phẩm:", `${data.heighten_drug}`)
            .addField("Phụ trợ dược phẩm:", `${data.auxiliary_drug}`);
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
        name: "jx3lag",
        value: "Tên tâm pháp",
        type: 3,
        required: true,
        description: "Nhập tên tâm pháp",
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
        .setDescription(`Sử dụng lệnh: jx3lag <Tên tâm pháp>`);

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
              "https://www.jx3api.com/data/school/snacks",
              {
                name: `${cmd}`,
              }
            );
            const data = resp.data.data;
            let embed = new MessageEmbed()
              .setAuthor(`Tên tâm pháp: ${cmd}`, client.botconfig.IconURL)
              .setColor("GREEN")
              .addField("Tăng cường thực phẩm:", `${data.heighten_food}`)
              .addField("Phụ trợ thực phẩm:", `${data.auxiliary_food}`)
              .addField("Tăng cường dược phẩm:", `${data.heighten_drug}`)
              .addField("Phụ trợ dược phẩm:", `${data.auxiliary_drug}`);
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
