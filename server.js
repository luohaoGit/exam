var connect = require('connect'),
	http = require('http'),
	fs = require('fs'),
	serveStatic = require('serve-static'),
	app;

// server
app = connect()

// ָ�� static file ��·��
// request ��������ȥ static Ŀ¼�ң�û�з��ϵĲŽ�����һ�� middleware
	.use(serveStatic('./www'))

	.use(function(req, res, next){
		fs.readFile('./www/index.html', function(err, data){
			res.write(data);
			res.end();
		})
	})

// ���� server �� 8000
http.createServer(app).listen(8000, function() {
	console.log('Running on http://localhost:8000');
});