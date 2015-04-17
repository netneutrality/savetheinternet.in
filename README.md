# SaveTheInternet.in #

## Send your views to TRAI! ##

Join us in fighting for net neutrality. Let’s remind TRAI that their job is to protect the rights of consumers, not the profit margins of telcos. Let’s demand access to the free, open Internet.


## Help us ##
Help us by [reporting issues, suggestions](https://github.com/netneutrality/savetheinternet.in/issues), or contributing to the code.

If you'd like to join our discussions, please contact us via email.

### Code
Please install [editorconfig plugin](http://editorconfig.org/#download) to your editor/IDE, in order to maintain consistence file formatting.

Please make all Pull Requests against the `stage` branch. Pull Requests made against `master` will have to be closed and made against `stage`.

If you are making major changes, create a new issue (or comment on the existing issue) and tell that you are working on it (we might already be working on it). And work on a new branch. For example,
```
> git checkout -b large-bug-fix-issue-19
```
Please make sure you merge the latest commits from `stage` into your pull request at the time of creating it. If there are conflicts while merging your pull request we will ask you to pull the latest changes, resolve conflicts, and come back. To do this:
```
> # add remote repo if you haven't already
> git remote add upstream git@github.com:netneutrality/savetheinternet.in.git

> # fetch and incorporate upstream changes
> git fetch upstream
> git checkout stage
> git pull --rebase upstream stage

> # go back to your branch and resolve the issues
> git checkout large-bug-fix-issue-19
> git rebase stage
```
### How to run it locally

Install node

```
> cd app_directory
> npm install
> npm start
```
