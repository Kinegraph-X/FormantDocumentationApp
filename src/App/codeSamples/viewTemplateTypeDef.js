/**
 * @typedef {Object} ViewTemplate
 * @property {Number|null} UID
 * @property {String|null} type
 * @property {Boolean} isCompound
 * @property {String|null} nodeName
 * @property {Boolean|null} isCustomElem
 * @property {String} templateNodeName
 * @property {Array<AttributeDesc>} attributes
 * @property {Number} section
 * @property {Array<Prop>} props
 * @property {Array<State>} states
 * @property {Array<Prop|States>} streams
 * @property {Number|null} targetSlotIndex
 * @property {StylesheetWrapper|null} sWrapper
 * @property {StylesheetWrapper|null} sOverride
 * @property {Command|null} command
 * @property {Array<ReactivityQuery>} reactOnParent
 * @property {Array<ReactivityQuery>} reactOnSelf
 * @property {Array<EventSubscription>} subscribeOnParent
 * @property {Array<EventSubscription>} subscribeOnChild
 * @property {Array<EventSubscription>} subscribeOnSelf
 * @property {Array<KeyboardHotkeys>} keyboardSettings
 * @property {Array<KeyboardListeners>} keyboardEvents
 * @property {Boolean} isDummy
 */

/**
 * templateFactory
 * @param {ViewTemplate} viewTemplate
 */
 function templateFactory(viewTemplate) {
 }
 
 templateFactory({
	nodeName : 'dummy',
	wrongProp : false,
	props : null
 })