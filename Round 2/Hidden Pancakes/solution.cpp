#include <iostream>
#include <vector>
#include <climits>
#include <algorithm>
#include <set>
#include <map>
#include <stack>
#include <math.h>
#include <iterator>
#include <string>

using namespace std;

long long int MOD = 1000000007;
long long int fact[100001];
long long int invFact[100001];
int V[100001];

// To compute x^y under modulo MOD
long long int power(long long int x, long long int y)
{
  if (y == 0)
    return 1;
  long long int p = power(x, y / 2) % MOD;
  p = (p * p) % MOD;

  return y % 2 == 0 ? p : (x * p) % MOD;
}

long long int modInverse(long long int a)
{
  return power(a, MOD - 2);
}
void computeFactorial()
{
  fact[0] = 1;
  invFact[0] = 1;
  for (int i = 1; i <= 100000; i++)
  {
    fact[i] = (fact[i - 1] * (long long int)(i)) % MOD;
    invFact[i] = modInverse(fact[i]);
  }
}

long long int nChooseK(int n, int k)
{
  if (n < 0 || k < 0 || n < k)
  {
    return 0;
  }
  return (((fact[n] * invFact[k]) % MOD) * invFact[n - k]) % MOD;
}

int lastIndexOfN(int n, int l, int r)
{
  for (int i = r; i >= l; i--)
  {
    if (V[i] == n)
    {
      return i;
    }
  }
  return -1;
}

long long int getCombs(int l, int r, int pivot)
{
  if (l >= r)
  {
    return 1;
  }
  int m = lastIndexOfN(pivot, l, r - 1);

  if (m == -1)
  {
    return 0;
  }
  int p = m - l;
  return (
      (((nChooseK(r - l - 1, p) * getCombs(l, m, pivot)) % MOD) * getCombs(m + 1, r, pivot + 1)) % MOD);
}

int main()
{
  int T, N, tmp;
  long long int ans;
  cin >> T;
  computeFactorial();
  for (int t = 0; t < T; t++)
  {
    cin >> N;
    for (int i = 0; i < N; i++)
    {
      cin >> tmp;
      V[i] = (tmp);
    }
    ans = getCombs(0, N, 1);
    cout << "Case #" << t + 1 << ": " << ans << endl;
  }

  return 0;
}
