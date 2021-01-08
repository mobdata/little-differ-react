/**
* @name app/header.ts
*/

export interface MergeProps {
  orig: object // The Original JSON document to be displayed.
  docA: object // The first JSON document to be compared.
  docB: object // The second JSON document to be compared.
}
