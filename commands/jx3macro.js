const { MessageEmbed } = require("discord.js");
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
            "https://www.jx3api.com/data/school/macro",
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

        switch (cmd.toLowerCase()) {
          case "băng tâm" ||
            "bang tam" ||
            "that tu dps" ||
            "7tu dame" ||
            "7tu dps" ||
            "thất tú dame" ||
            "thất tú dps" ||
            "that tu dame":
            cmd = "冰心诀";
            break;
          case "vân thường" || "van thuong" || "that tu buff" || "7tu buff":
            cmd = "云裳心经";
            break;
          case "hoa gian" ||
            "hoa gian du" ||
            "vạn hoa dame" ||
            "vạn hoa dps" ||
            "van hoa dame" ||
            "van hoa dps":
            cmd = "花间游";
            break;
          case "ly kinh" ||
            "ly kinh dịch đạo" ||
            "vạn hoa buff" ||
            "van hoa buff":
            cmd = "离经易道";
            break;
          case "độc kinh" ||
            "ngũ độc dame" ||
            "ngũ độc dps" ||
            "ngu doc dame" ||
            "ngu doc dps" ||
            "5d dame" ||
            "5d dps":
            cmd = "毒经";
            break;
          case "bổ thiên quyết" ||
            "bổ thiên" ||
            "ngu doc buff" ||
            "5d buff" ||
            "ngũ độc buff":
            cmd = "补天诀";
            break;
          case "mạc vấn" ||
            "trường ca môn dame" ||
            "trường ca dame" ||
            "trường ca dps" ||
            "truong ca mon dame" ||
            "truong ca dame" ||
            "truong ca dps" ||
            "mac van":
            cmd = "莫问";
            break;
          case "tương tri" ||
            "trường ca môn buff" ||
            "trường ca buff" ||
            "truong ca mon buff" ||
            "truong ca buff" ||
            "tuong tri":
            cmd = "相知";
            break;
          default:
          // code block
        }

        let data = {
          name: `${cmd}`,
        };

        const sendPostRequest = async (interaction) => {
          try {
            const resp = await axios.post(
              "https://www.jx3api.com/data/school/macro",
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
