import { UnreachableCaseError } from './index'

export default function assertNever(x: never): never {
  throw new UnreachableCaseError(`Unexpected case: ${x}`)
}
