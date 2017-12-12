import test from 'ava';
import eventify from '../src/event'
// import lazi from '../'

test.beforeEach(t => {
  var r = {count:0}
  var f1 = () => {console.log('f1'); r.count++}
  var f2 = () => {console.log('f2'); r.count++}
  var f3 = () => {console.log('f3'); r.count++}
  var f4 = () => {console.log('f4'); r.count++}
  var f5 = () => {console.log('f5'); r.count++}

  var o1 = {a: 1, b:2}
  eventify(o1)

  o1.on('pre', f1)
  o1.on('pre', f2)
  o1.on('pre', f3)
  o1.on('pre', f4)

  o1.on('pre', 'data-a1', f1)
  o1.on('pre', 'data-a1', f2)
  o1.on('pre', 'data-a1', f3)

  o1.pipe('pre.data-a1', f1)

  t.context = {
    o1, f1, f2, f3, f4, f5, r
  }
})

test('on', t => {
  var {o1, f1, f2, f3, f4, f5} = t.context
  t.is(o1.$all().pre.length, 4);
  t.is(o1.$all().pre['data-a1'].length, 3);
});

test('off an existing handler', t => {
  var {o1, f1, f2, f3, f4, f5} = t.context
  o1.off('pre', f1)
  t.is(o1.$all().pre.length, 3)
});

test('off a un-existing handler', t => {
  var {o1, f1, f2, f3, f4, f5} = t.context
  o1.off('pre', f5)
  t.is(o1.$all().pre.length, 4)
});

test('off all handlers', t => {
  var {o1, f1, f2, f3, f4, f5} = t.context
  o1.off('pre')
  t.is(o1.$all().pre.length, 0)
});

test('off existing handlers by selector', t => {
  var {o1, f1, f2, f3, f4, f5} = t.context
  o1.off('pre', 'data-a1', f3).off('pre', 'data-a1', f2)
  t.is(o1.$all().pre['data-a1'].length, 1)
});

test('off un-existing handlers by selector', t => {
  var {o1, f1, f2, f3, f4, f5} = t.context
  o1.off('pre', 'data-a1', f1).off('pre', 'data-a1', f4)
  t.is(o1.$all().pre['data-a1'].length, 2)
});

test('off all handlers by selector', t => {
  var {o1, f1, f2, f3, f4, f5} = t.context
  o1.off('pre', 'data-a1')
  t.is(o1.$all().pre['data-a1'].length, 0)
});

test('off', t => {
  var {o1, f1, f2, f3, f4, f5} = t.context
  o1.off('pre', 'data-a1', f2).off('pre', f1).off('pre', f5).off('pre', 'data-a1', f3)
  t.is(o1.$all().pre.length, 3)
  t.is(o1.$all().pre['data-a1'].length, 1)
});

test('emit', t => {
  var {o1, f1, f2, f3, f4, f5, r} = t.context
  o1.emit('pre')
  t.is(r.count, 7)
})

test('emit selector', t => {
  var {o1, f1, f2, f3, f4, f5, r} = t.context
  o1.emit('pre.data-a1')
  t.is(r.count, 3)
})

test('pipe', t => {
  var {o1, f1, f2, f3, f4, f5, r} = t.context
  o1.pipe('pre.data-a1')
  t.is(r.count, 1)
})
