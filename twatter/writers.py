import codecs
import cStringIO
import csv
import json
import sys


class UnicodeWriter:
    def __init__(self, f, dialect=csv.excel, encoding="utf-8", **kwds):
        # Redirect output to a queue
        self.queue = cStringIO.StringIO()
        self.writer = csv.writer(self.queue, dialect=dialect, **kwds)
        self.stream = f
        self.encoder = codecs.getincrementalencoder(encoding)()

    def writerow(self, row):
        self.writer.writerow([s.encode("utf-8") for s in row])
        data = self.queue.getvalue()
        data = data.decode("utf-8")
        data = self.encoder.encode(data)
        self.stream.write(data)
        self.queue.truncate(0)

    def writerows(self, rows):
        for row in rows:
            self.writerow(row)


class CSVWriter(object):
    def __init__(self, output, **kwargs):
        self._writer = UnicodeWriter(output)
        self._first = True

    def write(self, data):
        if self._first:
            self._writer.writerow(
                [unicode(r) for r in data.keys()]
            )

            self._first = False

        self._writer.writerow(
            [unicode(r) for r in data.values()]
        )

    def flush(self):
        self.output.flush()


class JSONWriter(object):
    def __init__(self, output, callback=None):
        self._writer = output
        self._data = []
        self._callback = callback

    def write(self, data):
        d = {}

        for key, value in data.items():
            d[key] = unicode(value)

        self._data.append(d)

    def flush(self):
        if self._callback:
            self._writer.write(
                '%s(' % self._callback
            )

        self._writer.write(
            json.dumps(self._data)
        )

        if self._callback:
            self._writer.write(')')
