import { expect, Locator } from '@playwright/test';
import { RichTextEditor } from '../../rich-text-editor';
import { DrillingEngineeringSectionPage } from './drilling-engineering-section.page';

export type SectionEditorName = 'Objectives' | 'KPI';

export class SectionObjectivesAndKpisPage extends DrillingEngineeringSectionPage {
  protected get panelTitle(): RegExp {
    return /^\s*Section Objectives and KPIs\s*$/;
  }

  private editorContainer(name: SectionEditorName): Locator {
    return this.panel.locator(name === 'Objectives' ? '.objectives-section' : '.kpi-section');
  }

  private readonly editors = new Map<SectionEditorName, RichTextEditor>();

  // The helper remembers the entered text between steps, so each editor is created once per test.
  editor(name: string): RichTextEditor {
    if (name !== 'Objectives' && name !== 'KPI') {
      throw new Error(`Unknown editor "${name}"; expected "Objectives" or "KPI"`);
    }
    let editor = this.editors.get(name);
    if (!editor) {
      editor = new RichTextEditor(
        this.page,
        this.editorContainer(name),
        // The title above the editor is plain text, and the sticky header does not cover it.
        this.editorContainer(name).locator('.tab-section-title'),
        name,
      );
      this.editors.set(name, editor);
    }
    return editor;
  }

  async expandPanel(): Promise<void> {
    await super.expandPanel();
    await expect(this.editorContainer('Objectives').locator('.ql-editor')).toBeVisible({
      timeout: 30000,
    });
    await expect(this.editorContainer('KPI').locator('.ql-editor')).toBeVisible();
  }

  // Loads the design again so the editors show what was saved, not what is still in the page.
  async reopenPanel(): Promise<void> {
    const holeSection = this.holeSection;
    await this.openDrillingEngineering();
    await this.selectHoleSection(holeSection);
    await this.expandPanel();
  }
}
