import os

import redis
from rq import Worker, Queue, Connection

# Here, we listened for a queue called default
# and established a connection to the Redis server on localhost:6379.
listen = ['default']

redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')

conn = redis.from_url(redis_url)

if __name__ == '__main__':
    with Connection(conn):
        worker = Worker(list(map(Queue, listen)))
        worker.work()