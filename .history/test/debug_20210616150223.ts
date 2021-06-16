import { number } from 'yargs'
import {SmartQueue} from '../src/index'

const queue = new SmartQueue<number>()

queue.on((number, done)=>{
    console.log(number)
    done()
})