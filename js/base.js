/**
 * Created by DELL on 2018-03-08.
 * 需要修改  base  basePk 两个文件
 */
//QA环境

var baseUrl = {
	base: 'https://pkgame-q.lillyadmin.cn/',
	findAllSubject: 'api/exercise/questions',
	toanswer: 'api/exercise/toanswer',
	count: 'api/exercise/count',
	meinfo: 'api/user/info',
	rankList: 'api/rank/list',
	wxInfo: 'api/user/wxinfo',
	isPK: 'api/pk/validate',
	pkInfo: 'api/pk/info',
	pk: 'api/wschat?user=',
	basePk: '//pkgame-q.lillyadmin.cn/',
	caeatePk: 'api/pk/create',
	questions: 'api/pk/questions',
	toanswerpk: 'api/pk/toanswer',
	record: '/api/pk/record',
	answerList: '/api/pk/answerList',
	wxConfig: '/api/wx/wxConfig',
	shapeUrl: 'https://wechat.lillyadmin.cn/',
}
baseUrl.shapeImg = 'https://pkgame-q.lillyadmin.cn/Images/shared-sm.png';
baseUrl.headImageUrl = '../images/default.png';
baseUrl.wuManHeadImageUrl = '../images/default-woman.png';

//正式环境

//var baseUrl = {
//	base: 'https://pkgame-q.lillyadmin.cn/',
//	findAllSubject: 'api/exercise/questions',
//	toanswer: 'api/exercise/toanswer',
//	count: 'api/exercise/count',
//	meinfo: 'api/user/info',
//	rankList: 'api/rank/list',
//	wxInfo: 'api/user/wxinfo',
//	isPK: 'api/pk/validate',
//	pkInfo: 'api/pk/info',
//	pk: 'api/wschat?user=',
//	basePk: '//pkgame-q.lillyadmin.cn/',
//	caeatePk: 'api/pk/create',
//	questions: 'api/pk/questions',
//	toanswerpk: 'api/pk/toanswer',
//	record: '/api/pk/record',
//	answerList: '/api/pk/answerList',
//	wxConfig: '/api/wx/wxConfig',
//	shapeUrl: 'https://wechat.lillyadmin.cn/'
//}
//baseUrl.shapeImg = '../images/shared-sm.png';
//baseUrl.headImageUrl = '../images/default.png';
//baseUrl.wuManHeadImageUrl = '../images/default-woman.png';
	var vConsole = new VConsole();
	console.log('VConsole is cool');
