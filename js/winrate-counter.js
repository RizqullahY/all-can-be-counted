function calculateWinrate() {
    const currentWinrateInput = parseFloat($("#currentWinrate").val());
    const totalMatches = parseFloat($("#totalMatches").val());
    const targetWinrate = parseFloat($("#targetWinrate").val());
    const resultDiv = $("#result"); 

    if (
      isNaN(currentWinrateInput) ||
      isNaN(totalMatches) ||
      isNaN(targetWinrate)
    ) {
      resultDiv.html("");
      return;
    }

    if (!(currentWinrateInput == 100) && targetWinrate == 100) {
      resultDiv.html(
        "<p class='text-red-500'>NGOTAK LAH</p>"
      );
      return;
    }

    if (totalMatches < 0) {
      resultDiv.html(
        "<p class='text-red-500'>TOTAL MATCH GAK BISA NEGATIF</p>"
      );
      return;
    }

    const currentWins = (currentWinrateInput / 100) * totalMatches;

    if (targetWinrate >= 0 && targetWinrate <= 100) {
      if (targetWinrate > currentWinrateInput) {
        // Hitung berapa win yang dibutuhkan
        let winsNeeded = 0;
        let newTotalMatches = totalMatches;

        while (
          ((currentWins + winsNeeded) / (newTotalMatches + winsNeeded)) *
            100 <
          targetWinrate
        ) {
          winsNeeded++;
        }

        resultDiv.html(`
      <p class="text-wrap">Dengan winrate sekarang <strong>${currentWinrateInput.toFixed(
        2
      )}%</strong> dari <strong>${totalMatches}</strong> match,</p>
      <p class="text-wrap">Kamu butuh menang <strong>${winsNeeded}</strong> match lagi untuk mencapai winrate <strong>${targetWinrate.toFixed(
          2
        )}%</strong>.</p>
    `);
      } else if (targetWinrate < currentWinrateInput) {
        // Hitung berapa loss yang dibutuhkan
        let lossesNeeded = 0;
        let newTotalMatches = totalMatches;

        while (
          (currentWins / (newTotalMatches + lossesNeeded)) * 100 >
          targetWinrate
        ) {
          lossesNeeded++;
        }

        resultDiv.html(`
      <p class="text-wrap">Dengan winrate sekarang <strong>${currentWinrateInput.toFixed(
        2
      )}%</strong> dari <strong>${totalMatches}</strong> match,</p>
      <p class="text-wrap">Kamu harus kalah <strong>${lossesNeeded}</strong> match lagi untuk mencapai winrate <strong>${targetWinrate.toFixed(
          2
        )}%</strong>.</p>
    `);
      } else {
        resultDiv.html(
          `<p>Winrate kamu <strong>${currentWinrateInput.toFixed(
            2
          )}%</strong> sudah sesuai dengan target.</p>`
        );
      }
    } else {
      resultDiv.html(
        "<p class='text-red-500'>Target winrate harus antara 0 dan 100.</p>"
      );
    }
  }