# FDCL website

The Flight Dynamics and Control Laboratory website is maintained here, in **[gwuniversity/fdcl](https://github.com/gwuniversity/fdcl)**, and published at **[fdcl.engineering.gwu.edu](https://fdcl.engineering.gwu.edu/)**. The previous [fdcl-gwu/WWW](https://github.com/fdcl-gwu/WWW) repository is obsolete; send all new contributions here.

The site uses [Jekyll](https://jekyllrb.com/) and the [Nomod theme](https://jekyllthemes.io/theme/nomod-blog-jekyll-theme). Copy an existing article to learn the formatting rather than creating a new layout.

## Contribute a research article

Students **do not need write access to the university repository**. Work in a personal fork and submit a pull request—a request to merge your changes into this repository.

1. Click **Fork** on [gwuniversity/fdcl](https://github.com/gwuniversity/fdcl) to create a copy under your own GitHub account. For an existing fork, use **Sync fork → Update branch** before starting new work.
2. Clone your fork and create an article branch (replace `YOUR-USERNAME` and `my-topic`):

   ```sh
   git clone https://github.com/YOUR-USERNAME/fdcl.git
   cd fdcl
   git switch -c research/my-topic
   ```

   If you already have a local clone, preserve any unfinished work, switch to `main`, and run `git pull --ff-only` after syncing your fork. Then create the new branch.

3. Create `_posts/YYYY-MM-DD-my-topic.md` by copying a suitable existing research article. Update its title, description, date, author, images, and content. Keep `tags: [Research]` to include it in homepage Featured Research. The filename's `my-topic` portion is its **slug** and determines the URL `/my-topic`; keep it unique and stable.
4. Set `author` to your profile's exact `username` in `_members/`, including capitalization. Add a unique username if your profile lacks one; copy an existing member profile if yours does not exist. Your byline links to that profile, which automatically lists your authored articles. Cards omit author names. Credit the paper's full author list in the article and references.
5. Store figures in `images/posts/my-topic/` and any local videos in `videos/`. In `_pages/research.md`, append `my-topic` to the appropriate theme's `research-topic-cards.html` slug list, preserving the existing entries and using commas without spaces. The `Research` tag alone does not place a card under a theme.
6. Preview and check the article as described below, then commit the article and all associated files. Stage only files you intend to include:

   ```sh
   git status --short
   git add _posts/YYYY-MM-DD-my-topic.md images/posts/my-topic/ _pages/research.md
   # Also stage your member profile or video files if you added or changed them.
   git diff --cached
   git commit -m "Add research article on my topic"
   git push -u origin research/my-topic
   ```

7. Open [Pull requests → New pull request](https://github.com/gwuniversity/fdcl/compare), then **compare across forks**. Set:
   - **Base repository:** `gwuniversity/fdcl`; **base branch:** `main`.
   - **Head repository:** your personal fork; **compare branch:** `research/my-topic`.

   Give the pull request a descriptive title. Summarize the article, link its source paper, state what you checked locally, and ask **@tylee-fdcl** to review and merge it. If GitHub does not let you select a reviewer, mention that account in the description. Respond to feedback by committing and pushing to the same branch; the pull request updates automatically.

Opening a pull request does **not** change the live website. `main` is protected; normal contributions require an approving review before merging. Taeyoung's account has a publishing exception. Once an authorized maintainer merges the changes, [GitHub Actions](https://github.com/gwuniversity/fdcl/actions) builds and deploys the site. Wait for both steps to succeed, then check the live article. Students do not need to enable GitHub Pages or configure deployment in their forks.

See [GitHub's fork-and-pull-request guide](https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request-from-a-fork) for more detail.

## Preview and check

Install Git and Ruby using the [Jekyll installation guide](https://jekyllrb.com/docs/installation/). Deployment uses Ruby **3.3** and the lockfile records Bundler **2.6.2**. From your local repository:

```sh
gem install bundler -v 2.6.2
bundle install
bundle exec jekyll serve
```

Open [http://127.0.0.1:4000](http://127.0.0.1:4000). Saving source files rebuilds the preview; refresh the browser afterward. Check the full article, homepage card, Research theme, and Team profile, including images, videos, references, and a narrow browser window.

Stop the server with **Ctrl+C**, then run `bundle exec jekyll build` and `git diff --check` before submitting. The deployment workflow currently runs after merging, not on pull requests, so check locally first. Do not edit or commit generated files in `_site/`.

If an article is missing, check its filename, front matter, `tags: [Research]`, and author identifier. Future-dated posts and posts with `published: false` are excluded from the normal build. Image paths are case-sensitive. For a delayed live update, check the deployment status before refreshing without cache.

## Examples and other updates

Explain the problem, the main idea, what the results demonstrate, and why they matter. Use the theme's existing headings, captions, galleries, and numbered reference lists. Cite the underlying papers, distinguish simulation from physical experiments, and credit figures and collaborators.

| Example or location | What to use it for |
| --- | --- |
| [Score Kalman Filter](_posts/2026-09-24-score-kalman-filter-research.md) | A concise article and a separate card thumbnail |
| [Matrix Fisher distributions](_posts/2023-05-01-matrix-fisher-attitude-estimation.md) | Equations, image galleries, and numbered references |
| [Hybrid-system uncertainty](_posts/2026-09-17-uncertainty-hybrid-systems.md) | Local videos, figures, and captions |
| `_news/` | News: copy an existing article with `layout: news`; use the same author identifiers |
| `_members/` | Team profiles: keep filenames stable, update roles/dates, and save portraits in `images/students/` |
| `_data/settings.yml` → `about.about_videos` | Homepage clips: add an MP4, poster, and caption; aim for about five seconds |
| `_data/settings.yml` → `experiment` | Experiments page: copy an entry with its group, video, summary, and optional research link |
| `_pages/research.md` | Research introductions and the article lists for each theme |

The Publications page is generated: **do not edit `_pages/publication.md` directly**. Its source bibliography (`../tylee.bib`) and generator (`../Vitae/bib2pub.py`) are outside this repository. Ask the maintainer to update the bibliography and regenerate the page. Extra paper/code/video/article links are stored in `_data/publication_resources.json` under exact BibTeX keys and also require regeneration.
