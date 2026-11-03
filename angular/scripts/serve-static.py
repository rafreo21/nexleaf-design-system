"""Static server for the visual gate.

`python3 -m http.server` keeps a listen queue of 5, so the gate's parallel
workers get connection resets on the JS bundles and stories render empty.
This is the same server with a deep queue, on both IPv4 and IPv6.
"""
import functools
import http.server
import socket
import sys


class Server(http.server.ThreadingHTTPServer):
    address_family = socket.AF_INET6
    request_queue_size = 256
    daemon_threads = True

    def server_bind(self):
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        super().server_bind()


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


port, root = int(sys.argv[1]), sys.argv[2]
Server(('::', port), functools.partial(Quiet, directory=root)).serve_forever()
