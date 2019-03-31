import requests
import json
from socketIO_client import SocketIO, LoggingNamespace
import sys
import json
from datetime import datetime


class sender():
    def __init__(self, port=3000):
        #self.url = "http://localhost:{0}/python".format(port)
        self.url = "http://localhost:3000"
        self.headers = {
            'Content-type': 'application/json', 'Accept': 'text/plain'}

    def send(self, params):
        print("params:", params);
        requests.post(self.url, data=json.dumps(params), headers=self.headers)
        print("sended")
         #                 headers=self.headers, params=params)

        #with SocketIO( 'localhost', 3000, LoggingNamespace ) as socketIO:
         #   now = datetime.now()
         #   socketIO.emit( 'python-message', now.strftime( "%-d %b %Y %H:%M:%S.%f" ))
         #   socketIO.wait( seconds=1 )
        
        #return r


#a = sender()
#res = a.send({'msg': 'a', 'r': 'b'})
#print(res.text, res, res.url)
