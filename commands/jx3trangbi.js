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
        switch (cmd.toLowerCase().trim()) {
          case "băng tâm":
          case "bang tam":
          case "that tu dps":
          case "7tu dame":
          case "7tu dps":
          case "thất tú dame":
          case "thất tú dps":
          case "that tu dame":
            cmd = "冰心诀";
            break;
          case "vân thường":
          case "van thuong":
          case "that tu buff":
          case "7tu buff":
            cmd = "云裳心经";
            break;
          case "hoa gian":
          case "hoa gian du":
          case "vạn hoa dame":
          case "vạn hoa dps":
          case "van hoa dame":
          case "van hoa dps":
            cmd = "花间游";
            break;
          case "ly kinh":
          case "ly kinh dịch đạo":
          case "vạn hoa buff":
          case "van hoa buff":
            cmd = "离经易道";
            break;
          case "độc kinh":
          case "ngũ độc dame":
          case "ngũ độc dps":
          case "ngu doc dame":
          case "ngu doc dps":
          case "5d dame":
          case "5d dps":
          case "doc kinh":
            cmd = "毒经";
            break;
          case "bổ thiên quyết":
          case "bổ thiên":
          case "ngu doc buff":
          case "5d buff":
          case "ngũ độc buff":
            cmd = "补天诀";
            break;
          case "mạc vấn":
          case "trường ca môn dame":
          case "trường ca dame":
          case "trường ca dps":
          case "truong ca mon dame":
          case "truong ca dame":
          case "truong ca dps":
          case "mac van":
            cmd = "莫问";
            break;
          case "tương tri":
          case "trường ca môn buff":
          case "trường ca buff":
          case "truong ca mon buff":
          case "truong ca buff":
          case "tuong tri":
            cmd = "相知";
            break;
          case "vô phương":
          case "vo phuong":
          case "duoc tong dame":
          case "dược tông dame":
          case "duoc tong dps":
          case "dược tông dps":
            cmd = "无方";
            break;
          case "linh tố":
          case "linh to":
          case "dược tông buff":
          case "duoc tong buff":
            cmd = "灵素";
            break;
          case "ngạo huyết chiến ý":
          case "ngao huyet chien y":
          case "thien sach dame":
          case "thiên sách dame":
          case "thien sach dps":
          case "thiên sách dps":
            cmd = "傲血战意";
            break;
          case "thiết lao luật":
          case "thiet lao luat":
          case "thiên sách tank":
          case "thien sach tank":
            cmd = "铁牢律";
            break;
          case "dịch cân kinh":
          case "dich can kinh":
          case "thieu lam dame":
          case "thiếu lâm dame":
          case "thieu lam dps":
          case "thiếu lâm dps":
            cmd = "易筋经";
            break;
          case "tẩy tủy kinh":
          case "tay tinh kinh":
          case "thiếu lâm tank":
          case "thieu lam tank":
            cmd = "洗髓经";
            break;
          case "phần ảnh quyết":
          case "phan anh quyet":
          case "phan anh":
          case "phần ảnh":
          case "minh giáo dame":
          case "minh giao dame":
          case "minh giáo dps":
          case "minh giao dps":
            cmd = "焚影圣诀";
            break;
          case "minh tôn lưu ly thể":
          case "minh ton luu ly the":
          case "minh tôn":
          case "minh ton":
          case "minh giáo tank":
          case "minh giao tank":
            cmd = "明尊琉璃体";
            break;
          case "phân sơn kính":
          case "phan son kinh":
          case "thương vân dame":
          case "thuong van dame":
          case "thương vân dps":
          case "thuong van dps":
            cmd = "分山劲";
            break;
          case "thiết cốt y":
          case "thiet cot y":
          case "thương vân tank":
          case "thuong van tank":
            cmd = "铁骨衣";
            break;
          case "tử hà công":
          case "tu ha cong":
          case "tử hà":
          case "tu ha":
          case "thuần dương nội dame":
          case "thuan duong noi dame":
          case "thuần dương nội dps":
          case "thuan duong noi dps":
            cmd = "紫霞功";
            break;
          case "thái hư kiếm ý":
          case "thai hu kiem y":
          case "thái hư":
          case "thai hu":
          case "thuần dương ngoại dame":
          case "thuan duong ngoai dame":
          case "thuần dương ngoại dps":
          case "thuan duong ngoai dps":
            cmd = "太虚剑意";
            break;
          case "thiên la ngụy đạo":
          case "thien la nguy dao":
          case "thiên la":
          case "thien la":
          case "đường môn nội dame":
          case "duong mon noi dame":
          case "đường môn nội dps":
          case "duong mon noi dps":
            cmd = "天罗诡道";
            break;
          case "kinh vũ quyết":
          case "kinh vu quyet":
          case "kinh vũ":
          case "kinh vu":
          case "đường môn ngoại dame":
          case "duong mon ngoai dame":
          case "đường môn ngoại dps":
          case "duong mon ngoai dps":
            cmd = "惊羽诀";
            break;
          case "vấn thủy quyết":
          case "van thuy quyet":
          case "vấn thủy":
          case "van thuy":
          case "tàng kiếm dame":
          case "tang kiem dame":
          case "tàng kiếm dps":
          case "tang kiem dps":
          case "tang kiem":
          case "tàng kiếm":
            cmd = "问水诀";
            break;
          case "tiếu trần quyết":
          case "tieu tran quyet":
          case "cái bang dame":
          case "cai bang dame":
          case "cái bang dps":
          case "cai bang dps":
          case "cái bang":
          case "cai bang":
            cmd = "笑尘诀";
            break;
          case "bắc ngạo quyết":
          case "bac ngao quyet":
          case "bá đao":
          case "ba dao":
          case "bá đao dame":
          case "ba dao dame":
          case "bá đao dps":
          case "ba dao dps":
            cmd = "北傲诀";
            break;
          case "lăng hải quyết":
          case "lang hai quyet":
          case "bồng lai":
          case "bong lai":
          case "bồng lai dame":
          case "bong lai dame":
          case "bồng lai dps":
          case "bong lai dps":
            cmd = "凌海诀";
            break;
          case "ẩn long quyết":
          case "an long quyet":
          case "lăng tuyết các":
          case "lang tuyet cac":
          case "lăng tuyết":
          case "lang tuyet":
          case "lăng tuyết các dame":
          case "lang tuyet cac dame":
          case "lăng tuyết các dps":
          case "lang tuyet cac dps":
          case "lăng tuyết dame":
          case "lang tuyet dame":
          case "lăng tuyết dps":
          case "lang tuyet dps":
            cmd = "隐龙诀";
            break;
          case "thái huyền kinh":
          case "thai huyen kinh":
          case "diễn thiên tông":
          case "dien thien tong":
          case "diễn thiên tông dame":
          case "dien thien tong dame":
          case "diễn thiên tông dps":
          case "dien thien tong dps":
            cmd = "太玄经";
            break;
          case "cô phong quyết":
          case "co phong quyet":
          case "đao tông":
          case "dao tong":
          case "đao tông dps":
          case "dao tong dps":
          case "đao tông dame":
          case "dao tong dame":
            cmd = "孤锋诀";
            break;
          default:
          // code block
        }
        if (!cmd)
          return client.sendTime(
            interaction,
            `❌ | Không tìm thấy trang bị phù hợp`
          );
            console.log(cmd);
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
              .addField("Đồ PVP:", `${data.pvp}`)
              .addField("Đồ PVE:", `${data.pve}`)
              .setImage(data.pve);
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
