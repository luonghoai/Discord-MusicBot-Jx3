const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const axios = require("axios");

module.exports = {
  name: "jx3trangbi",
  description: "Tìm phối đồ PVP PVE",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["je"],
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
      .setFooter(`❌ | Không tìm thấy trang bị phù hợp`)
      .setDescription(`Sử dụng lệnh: jx3trangbi <Tên môn phái>`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd = args[0].value;
      if (!cmd)
        return client.sendTime(
          interaction,
          `❌ | Không tìm thấy trag bị phù hợp`
        );

      const sendPostRequest = async (interaction) => {
        try {
          const resp = await axios.post(
            "https://www.jx3api.com/data/school/equip",
            {
              name: `${cmd}`,
            }
          );
          const data = resp.data.data;
          let embed = new MessageEmbed()
            .setAuthor(`Trang bị: ${cmd}`, client.botconfig.IconURL)
            .setColor("GREEN")
            .addField("Nội công:", `${data.name}`, true)
            .addField("Đồ PVE:", `${data.pve}`)
            .addField("Đồ PVP:", `${data.pvp}`);
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
        name: "jx3trangbi",
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
        .setFooter(`❌ | Không tìm thấy trang bị phù hợp`)
        .setDescription(`Sử dụng lệnh: jx3trangbi <Tên tâm pháp>`);

      if (!args) return interaction.send(Embed);
      else {
        let cmd = args[0].value;
        if (!cmd)
          return client.sendTime(
            interaction,
            `❌ | Không tìm thấy trang bị phù hợp`
          );

        const sendPostRequest = async (interaction) => {
          try {
            const resp = await axios.post(
              "https://www.jx3api.com/data/school/equip",
              {
                name: `${cmd}`,
              }
            );
            const data = resp.data.data;
            let embed = new MessageEmbed()
              .setAuthor(`Trang bị: ${cmd}`, client.botconfig.IconURL)
              .setColor("GREEN")
              .addField("Nội công:", `${data.name}`, true)
              .addField("Đồ PVE:", `${data.pve}`)
              .addField("Đồ PVP:", `${data.pvp}`);
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
