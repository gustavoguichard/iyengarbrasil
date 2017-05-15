import * as subject from './helpers'
import expect from 'expect'

describe('Tests helpers.js', () => {

  describe('elm', () => {
    it('creates a html string with given properties', () => {
      expect(subject.elm('a', { 'class': 'foo', target: 'blank', 'href': 'http://google.com' }, 'Google'))
        .toBe('<a class="foo" target="blank" href="http://google.com">Google</a>')
    })

    it('creates a self-enclosing html string with given properties', () => {
      expect(subject.elm('img', { title: 'Image', 'src': 'google.jpg' }))
        .toBe('<img title="Image" src="google.jpg" />')
    })

    it('accepts an array of html strings as children', () => {
      const image = subject.elm('img', { title: 'Image', 'src': 'google.jpg' })
      const html = subject.elm('a', { 'href': '#' }, [image, image])
      expect(html)
        .toBe('<a href="#"><img title="Image" src="google.jpg" /><img title="Image" src="google.jpg" /></a>')
    })

    it('can be composed', () => {
      expect(subject.elm('div', {'class': 'root'},
        subject.elm('section', {'class': 'wrapper'}, [
          subject.elm('i', { 'class': 'fa' }),
          subject.elm('a', { 'href': '#' }, 'Link'),
        ])
      ))
      .toBe('<div class="root"><section class="wrapper"><i class="fa" /><a href="#">Link</a></section></div>')
    })
  })



  describe('classNames', () => {
    it('Aceita strings e concatena no resultado final', () => {
      expect(subject.classNames('foo')).toBe('foo')
      expect(subject.classNames('foo', 'bar')).toBe('foo bar')
    })

    it('Aceita arrays e concatena no resultado final', () => {
      expect(subject.classNames(['foo', 'bar'])).toBe('foo bar')
      expect(subject.classNames(['foo', 'bar'], 'zaz')).toBe('foo bar zaz')
      expect(subject.classNames(['foo', ['bar', 'zaz']])).toBe('foo bar zaz')
    })

    it('Aceita objetos e concatena as chaves com valores verdadeiros resultado final', () => {
      expect(subject.classNames({
        active: 1 > 0,
        inactive: 1 < 0,
      })).toBe('active')

      expect(subject.classNames({
        active: 1 > 0,
        inactive: 1 < 0,
      }, 'foo', ['bar'])).toBe('active foo bar')
    })

  })

})
