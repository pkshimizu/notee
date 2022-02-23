import { StoreState } from '../index'
import { createSelector } from '@reduxjs/toolkit'

const editorsSelector = (state: StoreState) => state.editors
const selectedState = createSelector([editorsSelector], (state) =>
  state.states.find((editorState) => editorState.id === state.selectedId)
)

const EditorsSelectors = {
  propertiesPanelSelector: createSelector([selectedState], (state) => state?.propertiesPanel),
  fontSize: createSelector([selectedState], (state) => state?.fontSize ?? 14),
  cursor: createSelector([selectedState], (state) => state?.cursor),
  preview: createSelector([selectedState], (state) => state?.preview),
  syncScroll: createSelector([selectedState], (state) => state?.syncScroll),
}

export default EditorsSelectors
