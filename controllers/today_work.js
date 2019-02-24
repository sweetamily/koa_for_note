var {getConnection, excSql} = require('../utils/mysql_pool');
var {handleErr} = require('../utils/handleErr');
var {makeInfo} = require('../utils/makeInfo');

var sd = require('silly-datetime');
var today_work = async (ctx, next) => {
    var id = ctx.params.userid;
    console.log(ctx.cookies.get('userid'))
    var connect = await getConnection(global.pool);
    var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    time = Date.parse(new Date(time))
    let result = await excSql(connect, 'SELECT * FROM notelist WHERE (? BETWEEN starttime AND endtime) AND userid=?', [time,id]).catch((err)=>{
        handleErr(err, ctx);
        throw Error(err.message)
    });
    console.log(result);
    makeInfo(result, ctx);
};

module.exports = {
    'GET /noteapp/today_work/:userid': today_work
};