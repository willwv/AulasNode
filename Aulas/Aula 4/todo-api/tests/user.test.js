const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/users')

beforeAll(async ()=>{
    await User.deleteMany()
})

test('Should call GET method successfuly', async() => {
    await request(app).get('/users').expect(200)
})

test('Should call POST method successfuly and create a new user', async() => {
    await request(app)
            .post('/users')
            .send({
                name: 'Biharck test',
                email: 'biharck@gmail.com',
                password: 'meuSegredo'
            })
            .expect(201)
})

test('Should call GET method and get all Users', async() => {
    const response = await request(app).get('/users').expect(200)
    console.log(response.body)
    expect(response.body[0].name).toBe('Biharck test')
})