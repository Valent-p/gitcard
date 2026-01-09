/** Fetches and returns data from gitbub api. */
export async function getGithubData(username: string) {
    // Fetch basic profile data
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    
    if(!profileRes.ok){
        throw new Error("User not found.")
    }

    const profile = await profileRes.json()

    // Now, fetch repos (limit to 100 for the mvp to avoid paging issues)
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);

    const repos = await reposRes.json();

    // CALCULATE top languages
    // We need to count how many times each language appears
    const languageMap: Record<string, number> = {}

    repos.forEach( (repo:any) => {
        if (repo.language){
            if(languageMap[repo.language]){
                languageMap[repo.language]++;
            } else {
                languageMap[repo.language] = 1;
            }
        }
    });

    // sort languages by count (high to low) and take top 5
    const topLanguages = Object.entries(languageMap)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([lang, count]) => ({lang, count}))

    // FIND HALL OF FAME (Most Starred)
    // Sort repos by stargazers_count
    const sortedRepos = [...repos].sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    const bestRepo = sortedRepos[0]

    return {
        profile,
        repos,
        topLanguages, // for charts
        bestRepo, // For hall of fame

        // Total stars
        totalStars: repos.reduce((acc: number, r: any) => acc + r.stargazers_count, 0)
    }
}
