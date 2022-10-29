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
            "5d dps" ||
            "doc kinh":
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
          case "vô phương" ||
            "vo phuong" ||
            "duoc tong dame" ||
            "dược tông dame" ||
            "duoc tong dps" ||
            "dược tông dps":
            cmd = "无方";
            break;
          case "linh tố" || "linh to" || "dược tông buff" || "duoc tong buff":
            cmd = "灵素";
            break;
          case "ngạo huyết chiến ý" ||
            "ngao huyet chien y" ||
            "thien sach dame" ||
            "thiên sách dame" ||
            "thien sach dps" ||
            "thiên sách dps":
            cmd = "傲血战意";
            break;
          case "thiết lao luật" ||
            "thiet lao luat" ||
            "thiên sách tank" ||
            "thien sach tank":
            cmd = "铁牢律";
            break;
          case "dịch cân kinh" ||
            "dich can kinh" ||
            "thieu lam dame" ||
            "thiếu lâm dame" ||
            "thieu lam dps" ||
            "thiếu lâm dps":
            cmd = "易筋经";
            break;
          case "tẩy tủy kinh" ||
            "tay tinh kinh" ||
            "thiếu lâm tank" ||
            "thieu lam tank":
            cmd = "洗髓经";
            break;
          case "phần ảnh quyết" ||
            "phan anh quyet" ||
            "phan anh" ||
            "phần ảnh" ||
            "minh giáo dame" ||
            "minh giao dame" ||
            "minh giáo dps" ||
            "minh giao dps":
            cmd = "焚影圣诀";
            break;
          case "minh tôn lưu ly thể" ||
            "minh ton luu ly the" ||
            "minh tôn" ||
            "minh ton" ||
            "minh giáo tank" ||
            "minh giao tank":
            cmd = "明尊琉璃体";
            break;
          case "phân sơn kính" ||
            "phan son kinh" ||
            "thương vân dame" ||
            "thuong van dame" ||
            "thương vân dps" ||
            "thuong van dps":
            cmd = "分山劲";
            break;
          case "thiết cốt y" ||
            "thiet cot y" ||
            "thương vân tank" ||
            "thuong van tank":
            cmd = "铁骨衣";
            break;
          case "tử hà công" ||
            "tu ha cong" ||
            "tử hà" ||
            "tu ha" ||
            "thuần dương nội dame" ||
            "thuan duong noi dame" ||
            "thuần dương nội dps" ||
            "thuan duong noi dps":
            cmd = "紫霞功";
            break;
          case "thái hư kiếm ý" ||
            "thai hu kiem y" ||
            "thái hư" ||
            "thai hu" ||
            "thuần dương ngoại dame" ||
            "thuan duong ngoai dame" ||
            "thuần dương ngoại dps" ||
            "thuan duong ngoai dps":
            cmd = "太虚剑意";
            break;
          case "thiên la ngụy đạo" ||
            "thien la nguy dao" ||
            "thiên la" ||
            "thien la" ||
            "đường môn nội dame" ||
            "duong mon noi dame" ||
            "đường môn nội dps" ||
            "duong mon noi dps":
            cmd = "天罗诡道";
            break;
          case "kinh vũ quyết" ||
            "kinh vu quyet" ||
            "kinh vũ" ||
            "kinh vu" ||
            "đường môn ngoại dame" ||
            "duong mon ngoai dame" ||
            "đường môn ngoại dps" ||
            "duong mon ngoai dps":
            cmd = "惊羽诀";
            break;
          case "vấn thủy quyết" ||
            "van thuy quyet" ||
            "vấn thủy" ||
            "van thuy" ||
            "tàng kiếm dame" ||
            "tang kiem dame" ||
            "tàng kiếm dps" ||
            "tang kiem dps" ||
            "tang kiem" ||
            "tàng kiếm":
            cmd = "问水诀";
            break;
          case "tiếu trần quyết" ||
            "tieu tran quyet" ||
            "cái bang dame" ||
            "cai bang dame" ||
            "cái bang dps" ||
            "cai bang dps" ||
            "cái bang" ||
            "cai bang":
            cmd = "笑尘诀";
            break;
          case "bắc ngạo quyết" ||
            "bac ngao quyet" ||
            "bá đao" ||
            "ba dao" ||
            "bá đao dame" ||
            "ba dao dame" ||
            "bá đao dps" ||
            "ba dao dps":
            cmd = "北傲诀";
            break;
          case "lăng hải quyết" ||
            "lang hai quyet" ||
            "bồng lai" ||
            "bong lai" ||
            "bồng lai dame" ||
            "bong lai dame" ||
            "bồng lai dps" ||
            "bong lai dps":
            cmd = "凌海诀";
            break;
          case "ẩn long quyết" ||
            "an long quyet" ||
            "lăng tuyết các" ||
            "lang tuyet cac" ||
            "lăng tuyết" ||
            "lang tuyet" ||
            "lăng tuyết các dame" ||
            "lang tuyet cac dame" ||
            "lăng tuyết các dps" ||
            "lang tuyet cac dps" ||
            "lăng tuyết dame" ||
            "lang tuyet dame" ||
            "lăng tuyết dps" ||
            "lang tuyet dps":
            cmd = "隐龙诀";
            break;
          case "thái huyền kinh" ||
            "thai huyen kinh" ||
            "diễn thiên tông" ||
            "dien thien tong" ||
            "diễn thiên tông dame" ||
            "dien thien tong dame" ||
            "diễn thiên tông dps" ||
            "dien thien tong dps":
            cmd = "太玄经";
            break;
          case "cô phong quyết" ||
            "co phong quyet" ||
            "đao tông" ||
            "dao tong" ||
            "đao tông dps" ||
            "dao tong dps" ||
            "đao tông dame" ||
            "dao tong dame":
            cmd = "孤锋诀";
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
              .setAuthor(`Macro: ${args[0].value}`, client.botconfig.IconURL)
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
