import { prosePluginFactory } from "@milkdown/core";
import { Transaction, EditorState } from "prosemirror-state";
import { keymap } from "prosemirror-keymap";

// A ProseMirror [command](https://prosemirror.net/docs/guide/#commands)
function insertTab(
  state: EditorState,
  dispatch?: (tr: Transaction) => boolean | void
) {
  if (dispatch) dispatch(state.tr.insertText("\t"));
  return true;
}

// Plugin for putting a "\t" on pressing Tab key instead of moving to the next element,
// solves https://www.reddit.com/r/StandardNotes/comments/pu68wf/comment/he1h7rv
export default prosePluginFactory([
  keymap({
    Tab: insertTab,
  }),
]);
