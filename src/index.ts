import actions from '@/actions'
import { ActionEvent } from '@/types'
import { actionsMessage, exit, isTest, parseActionArgs, toCamelCase } from '@/utils'

const [workflow, ...args] = process.argv.slice(2)
if (!workflow) exit(`Error: no action provided\n${actionsMessage(actions)}`)

const action = toCamelCase(workflow) as keyof typeof actions
const fn = actions[action]
if (!fn) exit(`Error: action ${workflow} not found\n${actionsMessage(actions)}`)

const opts = parseActionArgs(args)

if (!opts.event) {
  opts.event = isTest ? ActionEvent.test : ActionEvent.local_dispatch
}

;(async (): Promise<void> => {
  await fn(opts)
})()
