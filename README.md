# Horseshoes for Redux and Sagas

A suite of helpers, and model definitions for a normalized Redux and Saga stack.

## Getting started
**Note**: This module is a work in progress and may frequently have breaking changes. It is, however, currently being used effectively by [Unicorn](https://unicornagency.com) across a myriad of applications (SPA, Electron, etc) so the library is stable enough for production use. Just note that while in alpha, you should use specific versions.

Install: `yarn add horseshoes`

## WHY Horseshoes? CRUD operations with Redux in practice
Since redux is very open and un-opinionated, states can look very different between developers and projects. As such, we've aimed to normalize state with a specific schema defined by our `Resources` type. As an example, all of these are valid approaches for state management, but none of them offer both flexibility and rigidity without careful planning and type definitions:

**Typical practice with Arrays:**
Below is a typical setup seen in many tutorials across the web. The reasoning behind it makes sense: javascript as a functional language has a lot of benefits. However, data should almost never be stored in any meaningful way as an Array. It's inefficient and despite the saving of verbosity later with method chaining, your reducers and actions suffer the consequences.

```typescript
const rootState = {
  tasks: [
    { id: 0, name: 'my first task', complete: false },
    { id: 1, name: 'my second task', complete: false },
    { id: 2, name: 'my completed task', complete: true }
  ]
}

// This is approach is nice, because it's easy to filter and sort arrays
const completedTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(t => t.complete)
}

// Updating states with this approach, however, is slow and verbose
const taskReducer = (state, { type, payload }) => {
  switch (type) {
    // Is this immutable? Depends on if you know about accidental mutations
    // Lots of room for bad practices here: indexOf, array mutations, push/pop
    // Not to mention, this is super inefficient when dealing with large arrays
    case TASK.UPDATE :
      let nextState = state.filter(t => t.id !== payload.id)
      nextState.push(payload)
      return nextState

    // Oh no! More mutations and side effects introduced that aren't obvious!
    case TASK.DELETE :
      return state.filter(t => t.id !== payload.id)

    default :
      return state
  }
}
```

**Typical practice with an Object**
```typescript
const rootState = {
  tasks: {
    // Did you remember to set your id twice: s the object key, and in the Task payload?
    // If not, how do you pass around your id's in a meaningful way?
    'first': { id: 'first', name: 'my first task', complete: false },
    'second': { id: 'second', name: 'my second task', complete: false }
  }
}

// Is your `Tasks` interface an object vs the Task[] array you would like to return?
// Did you have to refactor your type definitions because of naming collisions?
const completedTasks = (tasks: Tasks): Task[] => {
  // Did you remember to polyfill Object.entries?
  // Did you remember to do a guard for hasOwnProperty?
  return Object.entries(tasks).map(taskArr => taskArr[1])
}

const taskReducer = (state, { type, payload }) => {
  let newState = { ...state }

  // Better than storing arrays, but still lots of room for accidental mutations
  // Did you bootstrap your config with source mapping support to trace down improper implementation?
  // How do you trace and duplicate errors that users encounter in production?
  switch (type) {
    case TASK.UPDATE :
      newState[payload.id] = payload
      break

    case TASK.DELETE :
      delete newState[payload.id]
      break

    default :
      return state
  }

  return newState
}
```

### The Horseshoes approach
Taking the best from the above two approaches, we stored the data with normalization, sanity checks, and immutability. Leveraging immer and lodash along the way. Thus your data is stored like you would find in a typical database, but you have many helpers and methods at your disposal. Oh, and it's strongly typed the whole time. No more `any`!

**[Extend the Resources interface](https://unicorn.github.io/horseshoes/interfaces/resources.html)**
Horseshoes was designed to give you *some* rigidity while assuming a few small things like: `isLoading`, `errors`, and `errorTrace`. It also stores your data by `keys` (functional FTW) and `data` (OOP FTW) giving you a normalized state no matter what your programming paradigm.

```typescript
import { Resources, Resource } from 'horseshoes'

interface Task extends Resource {
  name: string
  complete: boolean

  // inherited from Resource
  key: string
}

interface Tasks extends Resources<Task> {
  lastFetchedAt: Date

  // inherited from Resources, used to debug implementation errors, regardless of where you have a proper source map setup.
  error: boolean
  errorTrace: {
    [key: string]: string
  }
  // normalized state so that you can fetch keys or the entire object from storage and glue them any way you want
  keys: string[]
  data: {
    [key: string]: Task
  }
}
```

**[Init Resources](https://unicorn.github.io/horseshoes/globals.html#initresources) from an option rehydrated state**
Note the typing and convenience of getting an initial or default state.

```typescript
const rootState = {
  tasks: initResources<Task>(rehydratedTasks)
}
```

**[Typed actions](https://unicorn.github.io/horseshoes/interfaces/resourceaction.html)**
Loose assumptions made with an optional `payload?` property for all CRUD actions.

```typescript
const updateTask = (payload: Task): ResourceAction<Task> => {
  type: TASK.UPDATE,
  payload
}
```

**[Simpler Reducers with Resource CRUD helpers](https://unicorn.github.io/horseshoes/globals.html#updateresource)**
With the small assumptions made above and in the library, we can then offer up a standardized way of performing CRUD ops:

```typescript
const defaultTask = {
  complete: false
}

const taskReducer = (state, { type, payload }) => {
  // One guard statement, immutability provided under the hood.
  if (!type || !payload) return state

  switch (type) {
    case TASK.UPDATE :
      // We can optionally pass any default properties to inherit from
      return updateResource<Task>(state, payload, defaultTask)

    case TASK.DELETE :
      return deleteResource<Task>(state, payload)

    default :
      return state
  }
}
```

**[toArray helper](https://unicorn.github.io/horseshoes/globals.html#toarray)**

```typescript
import { toArray } from 'horseshoes'

const completedTasks = toArray<Task>(tasks).filter(t => t.complete) // returns Task[]
```

## Read more
Check out the [API Docs](https://unicorn.github.io/horseshoes/) for now. We're still working on the project and documentation.
