export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('No $root provided from DomListener')
    }
    this.$root = $root
  }
}
