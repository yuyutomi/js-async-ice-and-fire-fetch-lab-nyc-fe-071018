const expect = require('expect')
const fs = require('fs')
const jsdom = require('jsdom')
const path = require('path')

describe('index', () => {
  before(done => {
    const html = path.resolve(__dirname, '..', 'index.html')
    const src = path.resolve(__dirname, '..', 'index.js')

    jsdom.env(html, [src], (err, window) => {
      if (err) {
        return done(err)
      }

      Object.keys(window).forEach(key => {
        global[key] = window[key]
      })

      done()
    })
  })



  describe('index.js', () => {
    let fetchSpy
    before(() => {
      window.fetch = require('node-fetch')
    })

    beforeEach(() => {
      fetchSpy = expect.spyOn(window, "fetch").andReturn(new Promise(() => {}))
    })

    afterEach(() => {
      fetchSpy.restore()
    })

    it('fetches the correct API URL', () => {
      fetchBooks()
      expect(fetchSpy.calls[0]).toNotBe(undefined, "fetch() was not called")
      const url = fetchSpy.calls[0].arguments[0]
      expect(url).toMatch('https://anapioficeandfire.com/api/books')
    })

  })
})
