import { click, visit } from "@ember/test-helpers";
import { test } from "qunit";
import selectKit from "discourse/tests/helpers/select-kit-helper";
import { acceptance } from "discourse/tests/helpers/qunit-helpers";

acceptance("CategoryChooser", function (needs) {
  needs.user();
  needs.settings({
    allow_uncategorized_topics: false,
  });

  test("does not display uncategorized if not allowed", async function (assert) {
    const categoryChooser = selectKit(".category-chooser");

    await visit("/");
    await click("#create-topic");
    await categoryChooser.expand();

    assert.ok(categoryChooser.rowByIndex(0).name() !== "uncategorized");
  });

  test("prefill category when category_id is set", async function (assert) {
    await visit("/new-topic?category_id=1");

    assert.equal(selectKit(".category-chooser").header().value(), 1);
  });
});
