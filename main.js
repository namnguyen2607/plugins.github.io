var fetch = global.nodemodule["node-fetch"];
var fs = global.nodemodule["fs"];
var path = global.nodemodule["path"];
var wait = global.nodemodule["wait-for-stuff"];
var streamBuffers = global.nodemodule["stream-buffers"];
function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
var restcountries = async function(type, data) {
	var sT = data.args.slice(1).join(" ")
	if (sT === '') {
		return {
			handler: "internal",
			data: global.config.commandPrefix + "restc <code/Tên đất nước>\r\n[VN/Viet Nam, USA/United States of America,...]\r"
		}
	} else {
		try {
			data.return({
				handler: "internal",
				data: `⏳ Đang lấy dữ liệu, vui lòng chờ....`
			});
			var api = await fetch(`https://restcountries.eu/rest/v2/name/${sT}`);
			var json = await api.json();
			var fetchimg = await fetch(json[0].flag);
			var buffer = await fetchimg.buffer();
			/*var flagx = new streamBuffers.ReadableStreamBuffer({
				frequency: 10,
					chunkSize: 1024
			});
			flagx.path = 'flag.svg';
			flagx.put(buffer);
			flagx.stop();
			data.log('Done!')
			var flag = 
			flag.path = 'flag.png'*/
			if (typeof json[0].regionalBlocs[0] != 'undefined') {
				console.log(1)
				return {
					handler: "internal",
					data: {
						body: 'Tên Đất Nước: '+ json[0].name + '\n' + 'Tên miền cấp cao nhất: ' + json[0].topLevelDomain + '\n' + 'Mã quay số: ' + '+' + json[0].callingCodes + '\nThủ đô: ' + json[0].capital + '\nNhà nước: ' + json[0].altSpellings[2] + '\nKhu vực: ' + json[0].region + '\nTiểu vùng: ' + json[0].subregion + '\nDân Số: ' + formatNumber(json[0].population) + '\nNgôn ngữ: '+ json[0].languages[0].nativeName.toString() + '\nTiền tệ: ' + json[0].currencies.map(c => `${c.name} (${c.code}/${c.symbol})`).join(', ').toString() + '\nMúi giờ: ' + json[0].timezones + '\nLiên Minh Khối: ' + json[0].regionalBlocs[0].acronym + ` (${json[0].regionalBlocs[0].name})\r\n`,
						//attachment: ([flag])
					}				
				}
			} else {
				console.log(2)
				return {
					handler: "internal",
					data: {
						body: 'Tên Đất Nước: '+ json[0].name + '\n' + 'Tên miền cấp cao nhất: ' + json[0].topLevelDomain + '\n' + 'Mã quay số: ' + '+' + json[0].callingCodes + '\nThủ đô: ' + json[0].capital + '\nNhà nước: ' + json[0].altSpellings[2] + '\nKhu vực: ' + json[0].region + '\nTiểu vùng: ' + json[0].subregion + '\nDân Số: ' + formatNumber(json[0].population) + '\nNgôn ngữ: '+ json[0].languages[0].nativeName.toString() + '\nTiền tệ: ' + json[0].currencies.map(c => `${c.name} (${c.code}/${c.symbol})`).join(', ').toString() + '\nMúi giờ: ' + json[0].timezones + '\r\n',
						//attachment: ([flag])
					}
				}
			}
		} catch (e) {
			return {
				handler: "internal",
				data: "❌ Không tìm thấy dữ liệu, vui lòng ghi đúng mã code vùng hoặc tên\r\n"+global.config.commandPrefix+"restc <vn> \r\n[VN/Viet Nam, US/United States,...]"
			}
		}
	}
}

module.exports = {
	restcountries: restcountries
}