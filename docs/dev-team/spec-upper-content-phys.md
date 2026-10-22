# Upper secondary content: Physics (ຟີຊິກສາດ) M.5, M.6, M.7

Part of `docs/dev-team/spec-upper.md` (section 2). Format as in `spec.md` section 5: `Lao | English`. Obj = objectives (paraphrased from the 2011 curriculum), Ideas = key ideas, Q = exactly 2 discussion questions, Act = 1 activity, Min = suggested minutes. The coder writes `summary` (one sentence, from objective 1) and a 3-5 item quiz per lesson. Lao is an AI draft; uncertain terms are listed in section 9 of `spec-upper.md` and must be marked `// REVIEW` in the content files. Scientist names stay English; units and symbols stay Latin.

Physics is 68 h in M.5 and M.6 and 102 h in M.7 (curriculum: 2 h/week x 34 weeks; M.7 3 h/week).

## M.5 Physics (68 h, 7 topics)

#### p5-01 ການເຄື່ອນທີ່ (12 h, SIM `kinematics`, 30 min)
- Obj:
  - ແຍກໄລຍະທາງ ອອກຈາກໄລຍະເຄື່ອນຍ້າຍ, ຄວາມໄວ ອອກຈາກຄວາມໄວສະເລ່ຍ | Distinguish distance from displacement, and speed from average velocity
  - ອະທິບາຍການເຄື່ອນທີ່ສະໝ່ຳສະເໝີ ແລະ ການເຄື່ອນທີ່ເລັ່ງສະໝ່ຳສະເໝີ ແລະ ອ່ານກຣາຟ x–t, v–t | Describe uniform and uniformly accelerated motion and read x–t and v–t graphs
  - ໃຊ້ v = v₀ + at ແລະ x = x₀ + v₀t + ½at² ແກ້ເລກ ລວມທັງການຕົກຕາມລຳພັງ | Use v = v₀ + at and x = x₀ + v₀t + ½at² including free fall
- Ideas:
  - ຄວາມຊັນຂອງກຣາຟ x–t ແມ່ນຄວາມໄວ; ຄວາມຊັນຂອງກຣາຟ v–t ແມ່ນຄວາມເລັ່ງ | The slope of x–t is velocity; the slope of v–t is acceleration
  - ເນື້ອທີ່ໃຕ້ກຣາຟ v–t ແມ່ນໄລຍະເຄື່ອນຍ້າຍ | The area under v–t is displacement
  - ການຕົກຕາມລຳພັງ: ຄວາມເລັ່ງ g ≈ 9.8 m/s² ເທົ່າກັນທຸກວັດຖຸ (ບໍ່ຄິດແຮງຕ້ານອາກາດ) | Free fall: a = g ≈ 9.8 m/s² for every object (air resistance ignored)
  - ຢູ່ຈຸດສູງສຸດຂອງການໂຍນຂຶ້ນ ຄວາມໄວເປັນສູນ ແຕ່ຄວາມເລັ່ງຍັງເທົ່າ g | At the top of a throw v = 0 but a is still g
- Q:
  - ເປັນຫຍັງຂົນນົກຕົກຊ້າກວ່າຫີນໃນອາກາດ ແຕ່ຕົກພ້ອມກັນໃນສູນຍາກາດ? | Why does a feather fall slower than a stone in air but together in a vacuum?
  - ຖ້າຄວາມໄວເປັນສູນ ຄວາມເລັ່ງຕ້ອງເປັນສູນບໍ? ຍົກຕົວຢ່າງ | If v = 0, must a = 0? Give an example (ball at the top of its flight)
- Act: ປ່ອຍບານຈາກຄວາມສູງ 2 m ແລະ ຈັບເວລາດ້ວຍໂທລະສັບ ແລ້ວຄິດໄລ່ g (ເວລາປະມານ 0.64 s) | Drop a ball from 2 m, time it with a phone and compute g (about 0.64 s)

#### p5-02 ຄວາມແຮງເດີນເຄື່ອນ (10 h, SIM `newton`, 30 min)
- Obj:
  - ບອກກົດເກນທີ 1, 2 ແລະ 3 ຂອງນິວເຕີນ ແລະ ຍົກຕົວຢ່າງ | State Newton's first, second and third laws with examples
  - ໃຊ້ ΣF = ma ຄິດໄລ່ແຮງລວມ, ມວນສານ ແລະ ຄວາມເລັ່ງ | Use ΣF = ma to find net force, mass and acceleration
  - ແຍກມວນສານ (kg) ອອກຈາກນ້ຳໜັກ (W = mg, N) ແລະ ອະທິບາຍແຮງຝືດ | Separate mass (kg) from weight (W = mg, N) and explain friction
- Ideas:
  - ກົດເກນທີ 1: ແຮງລວມເປັນສູນ ຄວາມໄວຄົງທີ່ (ຢູ່ນິ້ງ ຫຼື ເຄື່ອນສະໝ່ຳສະເໝີ) | Law 1: zero net force means constant velocity (at rest or uniform motion)
  - ກົດເກນທີ 2: ΣF = ma; ແຮງເທົ່າກັນ ມວນຫຼາຍ ເລັ່ງໜ້ອຍ | Law 2: ΣF = ma; same force, more mass, less acceleration
  - ກົດເກນທີ 3: ແຮງຄູ່ເທົ່າກັນ ທິດກົງກັນຂ້າມ ແຕ່ກະທຳຕໍ່ວັດຖຸຄົນລະອັນ | Law 3: equal and opposite forces that act on different bodies
  - ແຮງຝືດ f = μN; ແຮງຝືດສະຖິດສູງສຸດ (μₛN) ໃຫຍ່ກວ່າແຮງຝືດເຄື່ອນທີ່ (μₖN) | Friction f = μN; maximum static friction (μₛN) exceeds kinetic friction (μₖN)
- Q:
  - ເປັນຫຍັງຕ້ອງຄາດສາຍແອວນິລະໄພໃນລົດ? | Why wear a seat belt? (inertia)
  - ມ້າດຶງລົດເຂັນ ແຮງຄູ່ເທົ່າກັນ ແຕ່ເປັນຫຍັງລົດຍັງເຄື່ອນທີ່? | A horse pulls a cart with equal and opposite forces, so why does the cart move? (forces act on different bodies; ground friction on the horse)
- Act: ດຶງກ່ອງດ້ວຍເຄື່ອງຊັ່ງສະປຣິງ ບັນທຶກແຮງຕອນເລີ່ມຂະຫຍັບ ແລະ ແຮງຕອນເຄື່ອນສະໝ່ຳສະເໝີ ແລ້ວປຽບທຽບ | Pull a box with a spring balance; record the force to start it and to keep it moving steadily, and compare

#### p5-03 ປະລິມານເດີນເຄື່ອນ (6 h, TXT, 25 min)
- Obj:
  - ໃຫ້ນິຍາມ p = mv ແລະ ແຮງກະຕຸ້ນ (impulse) ແລະ ບອກໜ່ວຍ | Define momentum p = mv and impulse, with units
  - ໃຊ້ກົດເກນຮັກສາປະລິມານເດີນເຄື່ອນກັບການຕຳກັນໃນມິຕິດຽວ | Apply conservation of momentum to collisions in one dimension
  - ອະທິບາຍການຖອຍຫຼັງຂອງປືນ ແລະ ການເຮັດວຽກຂອງເຄື່ອງຈັກອາຍພົ່ນ | Explain gun recoil and jet/rocket propulsion
- Ideas:
  - p = mv (kg·m/s) ເປັນເວັກເຕີ ມີທິດຕາມຄວາມໄວ | p = mv (kg·m/s) is a vector in the direction of velocity
  - ແຮງກະຕຸ້ນ FΔt = Δp: ເວລາຕຳກັນຍາວຂຶ້ນ ແຮງຫຼຸດລົງ | Impulse FΔt = Δp: a longer collision time gives a smaller force
  - ລະບົບໂດດດ່ຽວ (ບໍ່ມີແຮງພາຍນອກ) ປະລິມານເດີນເຄື່ອນລວມຄົງທີ່ | In an isolated system total momentum is conserved
  - ການຕຳກັນຍືດຍຸ່ນ ຮັກສາພະລັງງານເດີນເຄື່ອນ; ບໍ່ຍືດຍຸ່ນ ບໍ່ຮັກສາ (ແຕ່ຮັກສາ p) | Elastic collisions conserve kinetic energy; inelastic ones do not (p is still conserved)
- Q:
  - ເປັນຫຍັງຖົງລົມນິລະໄພ ແລະ ຕຽງນຸ່ມ ຫຼຸດອັນຕະລາຍເວລາຕຳກັນ? | Why do airbags and soft landings reduce injury?
  - ມວນ 2 kg ແລ່ນ 3 m/s ຕຳມວນ 1 kg ທີ່ຢູ່ນິ້ງ ແລ້ວຕິດກັນ ຄວາມໄວຫຼັງຕຳເທົ່າໃດ? | A 2 kg cart at 3 m/s hits a 1 kg cart at rest and they stick: final speed? (2 m/s)
- Act: ຫຼີ້ນລົດເຄື່ອງຫຼີ້ນ 2 ຄັນ ຕຳກັນ ແລ້ວປຽບທຽບຄວາມໄວກ່ອນ-ຫຼັງ (ໃຊ້ວິດີໂອ) | Collide two toy carts and compare speeds before and after (using video)

#### p5-04 ແຮງງານ ແລະ ພະລັງງານ (6 h, SIM `pendulum` reused, 25 min)
- Obj:
  - ໃຫ້ນິຍາມແຮງງານ W = Fs cos θ (J) ແລະ ກຳລັງ P = W/t (W) | Define work W = Fs cos θ (J) and power P = W/t (W)
  - ຄິດໄລ່ພະລັງງານເດີນເຄື່ອນ ½mv² ແລະ ພະລັງງານທ່າຕັ້ງ mgh | Calculate kinetic energy ½mv² and potential energy mgh
  - ໃຊ້ກົດເກນຮັກສາພະລັງງານກົນຈັກ ແກ້ເລກ | Use conservation of mechanical energy to solve problems
- Ideas:
  - ແຮງງານເກີດເມື່ອແຮງເຮັດໃຫ້ວັດຖຸເຄື່ອນຕາມທິດຂອງແຮງ | Work is done when a force moves an object along its direction
  - ແຮງງານສຸດທິ = ການປ່ຽນແປງຂອງພະລັງງານເດີນເຄື່ອນ | Net work equals the change in kinetic energy
  - ບໍ່ມີແຮງຝືດ: Eₖ + Eₚ ຄົງທີ່; ມີແຮງຝືດ ບາງສ່ວນກາຍເປັນຄວາມຮ້ອນ | Without friction Eₖ + Eₚ is constant; with friction some becomes heat
  - ພະລັງງານບໍ່ຫາຍ ແຕ່ປ່ຽນຮູບ (ຮັກສາພະລັງງານລວມ) | Energy is not lost, only transformed (total energy is conserved)
- Q:
  - ຍົກກ່ອງ 10 kg ຂຶ້ນ 2 m ຕ້ອງເຮັດແຮງງານເທົ່າໃດ? (g = 9.8) | How much work lifts a 10 kg box 2 m? (196 J)
  - ເປັນຫຍັງຕຸ້ມຫ້ອຍໄປຕຳ່ສຸດແລ້ວຍັງໄປສູງເທົ່າເດີມໄດ້ ເມື່ອບໍ່ມີແຮງຝືດ? | Why does a frictionless pendulum return to the same height?
- Act: ປ່ອຍລົດເຄື່ອງຫຼີ້ນຈາກລະດັບຕ່າງກັນຕາມທາງຊັນ ແລ້ວວັດໄລຍະທີ່ມັນເລື່ອນຕໍ່ ແລະ ປຽບທຽບ | Release a toy car from different heights down a ramp and compare how far it slides afterwards

#### p5-05 ການເຄື່ອນທີ່ແບບຕ່າງໆໂດຍການກະທົບຂອງແຮງ (14 h, SIM `projectile`, 35 min)
- Obj:
  - ໃຊ້ກົດເກນຂອງນິວເຕີນກັບການເຄື່ອນທີ່ຕາມລວງນອນ, ລວງຕັ້ງ ແລະ ພື້ນຊັນ | Apply Newton's laws to motion on horizontal, vertical and inclined paths
  - ວິເຄາະການເຄື່ອນທີ່ໂຄ້ງຂອງວັດຖຸທີ່ຖືກຍິງເປັນມຸມ ໂດຍແຍກແນວນອນ ແລະ ແນວຕັ້ງ | Analyse projectile motion by separating horizontal and vertical parts
  - ອະທິບາຍການເຄື່ອນທີ່ມົນສະເໝີ ແລະ ແຮງເຂົ້າສູນ | Explain uniform circular motion and the centripetal force
- Ideas:
  - ແນວນອນ: ຄວາມໄວຄົງທີ່ vₓ = v₀ cos θ; ແນວຕັ້ງ: ຄວາມເລັ່ງ g ລົງ | Horizontal: constant vₓ = v₀ cos θ; vertical: acceleration g downward
  - ໄລຍະໄກ R = v₀² sin 2θ / g (ຈຸດຍິງ ແລະ ຈຸດຕົກລະດັບດຽວກັນ) ສູງສຸດທີ່ 45° | Range R = v₀² sin 2θ / g (same launch and landing level), maximum at 45°
  - ເທິງພື້ນຊັນ ອົງປະກອບຂອງນ້ຳໜັກຕາມພື້ນຊັນແມ່ນ mg sin θ | On an incline the component of weight along the slope is mg sin θ
  - ການເຄື່ອນທີ່ມົນ: ຄວາມເລັ່ງເຂົ້າສູນ a = v²/r ແລະ ແຮງເຂົ້າສູນ F = mv²/r ຊີ້ເຂົ້າຈຸດໃຈກາງ | Circular motion: centripetal acceleration a = v²/r and force F = mv²/r point to the centre
- Q:
  - ບານທີ່ຍິງອອກຕາມລວງນອນ ແລະ ບານທີ່ປ່ອຍຕົກຈາກຄວາມສູງດຽວກັນ ເປັນຫຍັງຖືກພື້ນພ້ອມກັນ? | Why does a ball fired horizontally land together with a ball dropped from the same height?
  - ລົດເລັ້ຽວໂຄ້ງ ແຮງໃດເຮັດໃຫ້ລົດເຄື່ອນຕາມໂຄ້ງ? | What force keeps a car on a curved road? (friction toward the centre)
- Act: ໂຍນບານໃສ່ມຸມ 30°, 45°, 60° ແລ້ວວັດໄລຍະ ປຽບທຽບກັບທິດສະດີ | Throw a ball at 30°, 45° and 60° and compare the distances with theory

#### p5-06 ການດຸນດ່ຽງ (ສະຖິດສາດ) (10 h, TXT, 30 min)
- Obj:
  - ໃຫ້ນິຍາມໂມເມັນຂອງແຮງ ແລະ ບອກເງື່ອນໄຂການດຸນດ່ຽງ | Define the moment of a force and state the conditions of equilibrium
  - ຫາຈຸດຖ່ວງໜັກຂອງວັດຖຸດ້ວຍການທົດລອງ | Find the centre of gravity of an object by experiment
  - ອະທິບາຍການດຸນດ່ຽງຄົງຕົວ, ບໍ່ຄົງຕົວ ແລະ ບໍ່ເລືອກທີ່ | Explain stable, unstable and neutral equilibrium
- Ideas:
  - ເງື່ອນໄຂ: ΣF = 0 ແລະ ໂມເມັນລວມ Στ = 0 | Conditions: ΣF = 0 and total moment Στ = 0
  - ໂມເມັນ τ = F × d (d ແມ່ນໄລຍະຕັ້ງສາກຈາກຈຸດໝູນ) | Moment τ = F × d (d is the perpendicular distance from the pivot)
  - ຈຸດຖ່ວງໜັກຕ່ຳ ແລະ ຖານກວ້າງ ເຮັດໃຫ້ມັນຄົງຕົວ | A low centre of gravity and a wide base make an object stable
  - ຄູ່ແຮງ (couple) ເຮັດໃຫ້ວັດຖຸໝູນ ໂດຍບໍ່ເຮັດໃຫ້ມັນເຄື່ອນຍ້າຍ | A couple makes an object rotate without translating it
- Q:
  - ແຮງ 40 N ຢູ່ຫ່າງຈຸດໝູນ 0.25 m ສົມດຸນກັບແຮງ 20 N ຢູ່ຫ່າງເທົ່າໃດ? | A 40 N force 0.25 m from the pivot balances a 20 N force how far away? (0.50 m)
  - ເປັນຫຍັງລົດບັນທຸກທີ່ເຕັມຊັ້ນເທິງຈຶ່ງລົ້ມງ່າຍ? | Why does a top-heavy truck tip over easily?
- Act: ດຸນໄມ້ບັນທັດເທິງດິນສໍ ແລະ ວາງເງິນຫຼຽນຕ່າງກັນສອງຂ້າງ ຫາຕຳແໜ່ງທີ່ດຸນ | Balance a ruler on a pencil with different coins on each side and find the balance positions

#### p5-07 ການປ່ຽນແປງຂອງວັດຖຸ ຍ້ອນຄວາມຮ້ອນ (10 h, SIM `states` reused, 30 min)
- Obj:
  - ແຍກຄວາມຮ້ອນ ອອກຈາກອຸນຫະພູມ ແລະ ອະທິບາຍດ້ວຍທິດສະດີເດີນເຄື່ອນໃນເລກຸນ | Distinguish heat from temperature using the kinetic theory
  - ຄິດໄລ່ປະລິມານຄວາມຮ້ອນ Q = mcΔT ແລະ ຄວາມຮ້ອນແຝງ Q = mL | Calculate heat Q = mcΔT and latent heat Q = mL
  - ອະທິບາຍການຢືດຕົວຍ້ອນຄວາມຮ້ອນ ແລະ ການປ່ຽນພາວະຂອງວັດຖຸ | Explain thermal expansion and changes of state
- Ideas:
  - ອຸນຫະພູມ ແມ່ນພະລັງງານເດີນເຄື່ອນສະເລ່ຍຂອງເລກຸນ; K = °C + 273 | Temperature reflects the average kinetic energy of molecules; K = °C + 273
  - ຄວາມຮ້ອນໄຫຼຈາກຮ້ອນໄປເຢັນ ດ້ວຍການນຳ, ການພາ ແລະ ການແຜ່ລັງສີ | Heat flows from hot to cold by conduction, convection and radiation
  - ນ້ຳ c ≈ 4200 J/(kg·K); ການລະລາຍ L ≈ 334 kJ/kg; ການກາຍເປັນໄອ L ≈ 2260 kJ/kg | Water c ≈ 4200 J/(kg·K); fusion L ≈ 334 kJ/kg; vaporisation L ≈ 2260 kJ/kg
  - ໃນຂະນະປ່ຽນພາວະ ອຸນຫະພູມຄົງທີ່ ທັງທີ່ຍັງເພີ່ມຄວາມຮ້ອນ | During a change of state temperature stays constant while heat is added
- Q:
  - ຕ້ອງໃຊ້ຄວາມຮ້ອນເທົ່າໃດ ເພື່ອເຮັດໃຫ້ນ້ຳ 1 kg ຈາກ 20 °C ເປັນ 80 °C? | How much heat warms 1 kg of water from 20 °C to 80 °C? (252 kJ)
  - ເປັນຫຍັງໄອນ້ຳຮ້ອນລວກຫຼາຍກວ່ານ້ຳເດືອດທີ່ 100 °C? | Why does steam scald more than boiling water at 100 °C? (latent heat released)
- Act: ຕົ້ມນ້ຳ ບັນທຶກອຸນຫະພູມທຸກນາທີ ແລະ ແຕ້ມກຣາຟ ຫາຈຸດເດືອດ | Heat water, record temperature each minute, plot it and find the boiling point

## M.6 Physics (68 h, 5 topics)

#### p6-01 ການປະກອບສ້າງ ແລະ ລັກສະນະຂອງວັດຖຸແຂງ, ແຫຼວ ແລະ ກາສ (20 h, SIM `gaslaw`, 35 min)
- Obj:
  - ອະທິບາຍວັດຖຸແຂງ, ແຫຼວ ແລະ ກາສ ດ້ວຍທິດສະດີເດີນເຄື່ອນໃນເລກຸນ | Explain solids, liquids and gases with the kinetic molecular theory
  - ໃຊ້ກົດເກນປາສກາລ, ຫຼັກການອາກຊີແມັດ ແລະ ຫຼັກການແບັກນູລີ ແກ້ເລກ ແລະ ອະທິບາຍປາກົດການ | Use Pascal's law, Archimedes' principle and Bernoulli's principle
  - ໃຊ້ກົດເກນຂອງກາສ ແລະ pV = nRT ແລະ ກົດເກນຂໍ້ທີ 1 ຂອງເທີໂມໄດນາມິກ | Use the gas laws, pV = nRT and the first law of thermodynamics
- Ideas:
  - ຄວາມດັນຂອງແຫຼວ p = p₀ + ρgh; ຄວາມດັນສົ່ງຕໍ່ເທົ່າກັນທົ່ວຂອງແຫຼວ (ປາສກາລ) | Fluid pressure p = p₀ + ρgh; pressure is transmitted equally (Pascal)
  - ແຮງລອຍຕົວ = ນ້ຳໜັກຂອງແຫຼວທີ່ຖືກແທນທີ່ (ອາກຊີແມັດ) | Buoyant force equals the weight of fluid displaced (Archimedes)
  - ບອຍ: pV ຄົງທີ່ (T ຄົງທີ່); ຊາລ: V/T ຄົງທີ່ (p ຄົງທີ່); T ຕ້ອງເປັນເຄວິນ | Boyle: pV constant (T constant); Charles: V/T constant (p constant); T must be in kelvin
  - ΔU = Q − W: ພະລັງງານໃນ ປ່ຽນຕາມຄວາມຮ້ອນທີ່ໄດ້ ແລະ ແຮງງານທີ່ເຮັດ | ΔU = Q − W: internal energy changes by heat gained minus work done
- Q:
  - ເຮືອເຫຼັກນ້ຳໜັກຫຼາຍ ເປັນຫຍັງຈຶ່ງລອຍ? | Why does a heavy steel ship float?
  - ເປັນຫຍັງປັ໊ມລົດຖີບແລ້ວທໍ່ປັ໊ມຮ້ອນຂຶ້ນ? | Why does a bicycle pump get warm when used?
- Act: ເຮັດ "ນັກດຳໃນຂວດ" (ຫຼອດຢາຢອດໃນຂວດພລາສຕິກ) ບີບຂວດແລ້ວອະທິບາຍດ້ວຍຄວາມດັນ | Make a Cartesian diver (a dropper in a plastic bottle), squeeze, and explain with pressure

#### p6-02 ໄຟຟ້າສະຖິດ (14 h, TXT, 30 min)
- Obj:
  - ອະທິບາຍການເກີດໄຟຟ້າບັນຈຸ ແລະ ກົດເກນຮັກສາໄຟຟ້າບັນຈຸ | Explain how charge arises and the conservation of charge
  - ໃຊ້ກົດເກນຄູລົງ F = kq₁q₂/r² ແລະ ທົ່ງໄຟຟ້າ E = F/q | Use Coulomb's law F = kq₁q₂/r² and the field E = F/q
  - ອະທິບາຍລະດັບໄຟຟ້າ, ຄວາມຕ່າງລະດັບໄຟຟ້າ ແລະ ເຄື່ອງຫ້ອນໄຟຟ້າ | Explain electric potential, potential difference and capacitors
- Ideas:
  - ມີປະຈຸບວກ ແລະ ລົບ; ປະຈຸພື້ນຖານ e = 1.6×10⁻¹⁹ C | Positive and negative charges; elementary charge e = 1.6×10⁻¹⁹ C
  - ປະຈຸຊະນິດດຽວກັນຍູ້ກັນ ຕ່າງຊະນິດດຶງກັນ; k = 9.0×10⁹ N·m²/C² | Like charges repel, unlike attract; k = 9.0×10⁹ N·m²/C²
  - ເສັ້ນແຮງໄຟຟ້າອອກຈາກປະຈຸບວກ ເຂົ້າປະຈຸລົບ ແລະ ບໍ່ຕັດກັນ | Field lines leave positive and enter negative charges and never cross
  - ເຄື່ອງຫ້ອນໄຟຟ້າ C = Q/V; ຕໍ່ຂະໜານ C = C₁ + C₂ | Capacitor C = Q/V; in parallel C = C₁ + C₂
- Q:
  - ປະຈຸ 1 μC ສອງປະຈຸ ຫ່າງກັນ 0.1 m ມີແຮງຍູ້ກັນເທົ່າໃດ? | Two 1 μC charges 0.1 m apart: what is the force? (0.9 N)
  - ເປັນຫຍັງເສົາລໍ່ຟ້າຈຶ່ງປ້ອງກັນຟ້າຜ່າໄດ້? | How does a lightning rod protect a building?
- Act: ຖູໄມ້ບັນທັດພລາສຕິກກັບຜົມ ແລ້ວດູດເຈ້ຍຕ້ອຍ ແລະ ສະແດງການເບີ່ງນ້ຳທີ່ໄຫຼຊ້າ | Rub a plastic ruler on hair to attract paper bits and bend a thin water stream

#### p6-03 ໄຟຟ້າກະແສກົງ (16 h, SIM `circuit` reused with `mode: 'ohm'`, 35 min)
- Obj:
  - ໃຫ້ນິຍາມກະແສໄຟຟ້າ, ຄວາມຕ່າງລະດັບໄຟຟ້າ, ຄວາມຕ້ານໄຟຟ້າ ແລະ ໃຊ້ກົດເກນໂອມ | Define current, potential difference and resistance and use Ohm's law
  - ຄິດໄລ່ວົງຈອນຕໍ່ອະນຸກົມ, ຂະໜານ ແລະ ປະສົມ ແລະ ໃຊ້ກົດເກນກຽກຊັບ (Kirchhoff) | Analyse series, parallel and mixed circuits and use Kirchhoff's laws
  - ຄິດໄລ່ກຳລັງໄຟຟ້າ P = VI ແລະ ພະລັງງານ E = Pt | Calculate power P = VI and energy E = Pt
- Ideas:
  - V = IR; R = ρL/A (ລວງຍາວຂຶ້ນ R ຂຶ້ນ; ໜ້າຕັດໃຫຍ່ຂຶ້ນ R ລົງ) | V = IR; R = ρL/A (longer wire, higher R; thicker wire, lower R)
  - ອະນຸກົມ: R = R₁ + R₂ ກະແສເທົ່າກັນ; ຂະໜານ: 1/R = 1/R₁ + 1/R₂ ແຮງດັນເທົ່າກັນ | Series: R = R₁ + R₂, same current; parallel: 1/R = 1/R₁ + 1/R₂, same voltage
  - ຈຸດແຍກ: ΣI ເຂົ້າ = ΣI ອອກ; ວົງປິດ: ΣV = 0 | Junction: ΣI in = ΣI out; closed loop: ΣV = 0
  - ພະລັງງານໄຟຟ້າວັດເປັນ kWh; 1 kWh = 3.6×10⁶ J | Electrical energy is measured in kWh; 1 kWh = 3.6×10⁶ J
- Q:
  - ເປັນຫຍັງໄຟຟ້າໃນເຮືອນຕໍ່ແບບຂະໜານ? | Why are household appliances wired in parallel?
  - ຫຼອດ LED 10 W ກັບຫຼອດໄສ້ 60 W ເປີດວັນລະ 5 ຊົ່ວໂມງ 30 ວັນ ໃຊ້ຕ່າງກັນເທົ່າໃດ kWh? | A 10 W LED and a 60 W filament bulb run 5 h/day for 30 days: how many kWh difference? (7.5 kWh)
- Act: ຕໍ່ວົງຈອນໄຟຫຼອດ 2 ດວງ ແບບອະນຸກົມ ແລະ ຂະໜານ ສັງເກດຄວາມສະຫວ່າງ ແລະ ເອົາຫຼອດໜຶ່ງອອກ | Wire two bulbs in series and in parallel; compare brightness and remove one bulb

#### p6-04 ກະແສໄຟຟ້າໃນແວດລ້ອມຕ່າງໆ (7 h, TXT, 25 min)
- Obj:
  - ອະທິບາຍກະແສໄຟຟ້າໃນໂລຫະ, ໃນທາດແຫຼວ (ເອເລັກໂຕຣລິດ), ໃນກາສ ແລະ ໃນສູນຍາກາດ | Explain current in metals, electrolytes, gases and vacuum
  - ອະທິບາຍທາດເຄິ່ງນຳໄຟຟ້າ, ດີໂອດ ແລະ ຕຣານຊິສເຕີ ຢ່າງງ່າຍ | Describe semiconductors, diodes and transistors simply
  - ບອກວິທີປ້ອງກັນຟ້າຜ່າ ແລະ ອັນຕະລາຍຂອງກະແສໄຟຟ້າ | State lightning protection and electrical safety
- Ideas:
  - ໂລຫະ: ເອເລັກຕຣົງອິດສະຫຼະ ຕ້ານໄຟຟ້າຫຼາຍຂຶ້ນເມື່ອຮ້ອນ | Metals: free electrons; resistance rises with temperature
  - ເອເລັກໂຕຣລິດ: ອີອອງເຄື່ອນທີ່ (ການແຍກດ້ວຍໄຟຟ້າ) ບໍ່ແມ່ນເອເລັກຕຣົງ | Electrolytes: ions carry the current (electrolysis)
  - ທາດເຄິ່ງນຳ: ຕ້ານໄຟຟ້າຫຼຸດລົງເມື່ອຮ້ອນ; ປະເພດ n ແລະ p | Semiconductors: resistance falls on heating; n-type and p-type
  - ດີໂອດຜ່ານກະແສໄດ້ທິດດຽວ | A diode passes current in one direction only
- Q:
  - ເປັນຫຍັງຫຼອດໄສ້ຈຶ່ງມັກຂາດຕອນເປີດທັນທີ? | Why do filament bulbs often fail at the moment of switching on? (cold low resistance, high surge)
  - ເປັນຫຍັງຕ້ອງເອົາໂທລະສັບອອກຈາກຟ້າຜ່າ ແລະ ບໍ່ຢືນໃຕ້ຕົ້ນໄມ້ສູງ? | Why avoid standing under tall trees in a thunderstorm?
- Act: ຕໍ່ຫຼອດ LED ກັບຖ່ານໄຟ ທັງສອງທິດ ແລະ ສັງເກດວ່າຕິດພຽງທິດດຽວ | Connect an LED to a cell both ways and observe it lights in one direction only

#### p6-05 ແສງເລຂາຄະນິດ (11 h, SIM `lens` reused, 30 min)
- Obj:
  - ໃຊ້ກົດການສະທ້ອນ ແລະ ກົດການຫັກແສງ n₁ sin θ₁ = n₂ sin θ₂ | Use the laws of reflection and refraction n₁ sin θ₁ = n₂ sin θ₂
  - ອະທິບາຍການສະທ້ອນພາຍໃນທັງໝົດ ແລະ ໃຊ້ໃນສາຍແກ້ວນຳແສງ | Explain total internal reflection and optical fibres
  - ໃຊ້ສູດເລນ 1/f = 1/u + 1/v ແລະ ອະທິບາຍສາຍຕາສັ້ນ/ຍາວ | Use the lens formula 1/f = 1/u + 1/v and explain short and long sight
- Ideas:
  - ດັດຊະນີຫັກແສງ n = c/v (ນ້ຳ 1.33; ແກ້ວ ≈ 1.5) | Refractive index n = c/v (water 1.33; glass ≈ 1.5)
  - ມຸມວິກິດ sin θc = n₂/n₁ (ນ້ຳ → ອາກາດ ≈ 49°) | Critical angle sin θc = n₂/n₁ (water to air ≈ 49°)
  - ເລນນູນ ໃຫ້ຮູບຈິງ (u > f) ຫຼື ຮູບລວງ (u < f); ເລນເວ້າ ໃຫ້ຮູບລວງສະເໝີ | A convex lens gives a real image (u > f) or virtual (u < f); a concave lens always gives a virtual one
  - ແວ່ນຂະຫຍາຍ, ກ້ອງຈຸລະທັດ ແລະ ກ້ອງສ່ອງທາງໄກ ໃຊ້ເລນຫຼາຍອັນ | Magnifiers, microscopes and telescopes use several lenses
- Q:
  - ເປັນຫຍັງສະລາດນ້ຳເບິ່ງຕື້ນກວ່າຄວາມເປັນຈິງ? | Why does a pool look shallower than it is?
  - ແວ່ນຕາຂອງຄົນສາຍຕາສັ້ນໃຊ້ເລນຊະນິດໃດ? | Which lens corrects short sight? (concave)
- Act: ຍິງແສງໄຟສາຍຕາຜ່ານໃບນ້ຳໃສ ແລະ ວັດມຸມຕົກກະທົບ ແລະ ມຸມຫັກ | Shine a torch through a tank of water and measure the angles of incidence and refraction

## M.7 Physics (102 h, 10 topics)

#### p7-01 ການເຄື່ອນທີ່ປັ່ນຂອງວັດຖຸແຂງ (8 h, TXT, 30 min)
- Obj:
  - ໃຊ້ປະລິມານການປັ່ນ: ມຸມ θ, ຄວາມໄວມຸມ ω ແລະ ຄວາມເລັ່ງມຸມ α | Use rotational quantities: angle θ, angular velocity ω, angular acceleration α
  - ໃຊ້ທໍອກ τ = Fr ແລະ ໂມເມັນອິນເນເຊຍ I ໃນ τ = Iα | Use torque τ = Fr and moment of inertia I in τ = Iα
  - ໃຊ້ພະລັງງານເດີນເຄື່ອນການປັ່ນ ½Iω² ແລະ ປະລິມານເດີນເຄື່ອນມຸມ L = Iω | Use rotational energy ½Iω² and angular momentum L = Iω
- Ideas:
  - v = ωr ແລະ aₜ = αr ເຊື່ອມການປັ່ນກັບການເຄື່ອນທີ່ຕາມເສັ້ນ | v = ωr and aₜ = αr link rotation with linear motion
  - ມວນສານຢູ່ໄກແກນ ເຮັດໃຫ້ I ໃຫຍ່ຂຶ້ນ | Mass farther from the axis increases I
  - ບໍ່ມີທໍອກພາຍນອກ L ຄົງທີ່ | With no external torque L is conserved
  - ການເຮັດວຽກໃນການປັ່ນ W = τθ | Work in rotation W = τθ
- Q:
  - ເປັນຫຍັງນັກສະເກດນ້ຳແຂງໝູນໄວຂຶ້ນເມື່ອດຶງແຂນເຂົ້າ? | Why does a skater spin faster when pulling the arms in?
  - ເປັນຫຍັງໃຊ້ປະແຈຍາວເປີດປະຕູງ່າຍກວ່າ? | Why is a door easier to open with a long handle far from the hinge?
- Act: ນັ່ງເກົ້າອີ້ໝູນ ຖືນ້ຳໜັກສອງມື ກາງແຂນ ແລ້ວດຶງເຂົ້າ ສັງເກດຄວາມໄວໝູນ | Sit on a swivel chair holding weights, arms out then in, and observe the spin rate

#### p7-02 ການສັ່ນໄຫວກົນຈັກ (9 h, TXT, 30 min)
- Obj:
  - ອະທິບາຍການສັ່ນໄຫວແບບຮາໂມນິກ ແລະ ປະລິມານ A, T, f | Describe simple harmonic motion and A, T, f
  - ໃຊ້ T = 2π√(m/k) ແລະ T = 2π√(L/g) | Use T = 2π√(m/k) and T = 2π√(L/g)
  - ອະທິບາຍການສັ່ນໄຫວຖືກບັງຄັບ ແລະ ການສັ່ນພ້ອງ (resonance) | Explain forced oscillation and resonance
- Ideas:
  - ແຮງຟື້ນຕົວ ເປັນສັດສ່ວນກັບການຍ້າຍ ແລະ ຊີ້ເຂົ້າຈຸດສົມດຸນ (F = −kx) | The restoring force is proportional to displacement and points to equilibrium (F = −kx)
  - ຄາບ T ບໍ່ຂຶ້ນກັບແອມພລິຈູດ (ມຸມນ້ອຍ) ແລະ ບໍ່ຂຶ້ນກັບມວນຂອງຕຸ້ມຫ້ອຍ | T does not depend on amplitude (small angles) or on the pendulum's mass
  - ພະລັງງານສະຫຼັບລະຫວ່າງເດີນເຄື່ອນ ແລະ ທ່າຕັ້ງ; ລວມຄົງທີ່ (ບໍ່ມີຄວາມຕ້ານ) | Energy swaps between kinetic and potential; total constant (no damping)
  - ສັ່ນພ້ອງ: ຄວາມຖີ່ບັງຄັບ ≈ ຄວາມຖີ່ທຳມະຊາດ ແອມພລິຈູດໃຫຍ່ສຸດ | Resonance: driving frequency ≈ natural frequency gives the largest amplitude
- Q:
  - ສະຫປຣິງ k = 50 N/m ມວນ 0.5 kg ມີຄາບເທົ່າໃດ? | A spring k = 50 N/m with a 0.5 kg mass: what is the period? (0.63 s)
  - ເປັນຫຍັງທະຫານຕ້ອງເດີນບໍ່ເປັນຈັງຫວະຂ້າມຂົວ? | Why must soldiers break step crossing a bridge?
- Act: ວັດຄາບຂອງຕຸ້ມຫ້ອຍຍາວ 1 m ຈາກ 20 ແກວ່ງ ແລ້ວປຽບທຽບກັບ 2.0 s | Time 20 swings of a 1 m pendulum and compare with about 2.0 s

#### p7-03 ຄື້ນກົນຈັກ (10 h, SIM `wave`, 35 min)
- Obj:
  - ແຍກຄື້ນຂວາງ ອອກຈາກຄື້ນຍາວ ແລະ ໃຊ້ v = fλ | Distinguish transverse from longitudinal waves and use v = fλ
  - ອະທິບາຍການຊ້ອນກັນ, ການແຊກແຊງ ແລະ ຄື້ນຢືນ | Explain superposition, interference and standing waves
  - ອະທິບາຍການສະທ້ອນ, ການຫັກແສງ ແລະ ການລ້ຽວເບນຂອງຄື້ນ | Explain reflection, refraction and diffraction of waves
- Ideas:
  - ຄື້ນນຳພະລັງງານ ບໍ່ນຳມວນສານ | A wave carries energy, not matter
  - ຄວາມໄວຄື້ນ v = fλ; T = 1/f | Wave speed v = fλ; T = 1/f
  - ຄື້ນສອງຄື້ນຊ້ອນກັນ: ໄລຍະດຽວກັນ ເສີມກັນ, ຕ່າງໄລຍະ 180° ຕັດກັນ | Two overlapping waves: in phase reinforce, 180° out of phase cancel
  - ຄື້ນຢືນເທິງເສັ້ນເຊືອກ: ຄວາມຖີ່ fₙ = nv/(2L) | Standing wave on a string: fₙ = nv/(2L)
- Q:
  - ເປັນຫຍັງເຮົາໄດ້ຍິນສຽງຈາກຫຼັງກຳແພງ ແຕ່ບໍ່ເຫັນແສງ? | Why can we hear around a corner but not see around it? (diffraction depends on wavelength)
  - ໃນເຊືອກຍາວ 1.5 m ຄື້ນ v = 3 m/s ຄວາມຖີ່ຮາໂມນິກຕົ້ນເທົ່າໃດ? | On a 1.5 m string with v = 3 m/s, what is the fundamental frequency? (1.0 Hz)
- Act: ໃຊ້ສະປຣິງຍາວ (slinky) ຫຼື ເຊືອກ ສ້າງຄື້ນຂວາງ ແລະ ຄື້ນຍາວ ແລະ ວັດຄວາມໄວຄື້ນ | Use a slinky or rope to make transverse and longitudinal waves and measure wave speed

#### p7-04 ສຽງ (10 h, TXT, 30 min)
- Obj:
  - ອະທິບາຍແຫຼ່ງກຳເນີດ ແລະ ການເຄື່ອນທີ່ຂອງສຽງ ແລະ ຄວາມໄວສຽງ | Explain the sources and propagation of sound and its speed
  - ບອກຄວາມເຂັ້ມສຽງ, ລະດັບສຽງ (dB), ລະດັບສູງ-ຕ່ຳ ແລະ ຄຸນນະພາບສຽງ | Describe intensity, sound level (dB), pitch and quality of sound
  - ອະທິບາຍການສະທ້ອນ, ການສັ່ນພ້ອງ ແລະ ປາກົດການດໍເບີ (Doppler) | Explain echo, resonance and the Doppler effect
- Ideas:
  - ສຽງເປັນຄື້ນຍາວ ຕ້ອງມີຕົວກາງ; ໃນອາກາດ 20 °C ≈ 343 m/s | Sound is a longitudinal wave needing a medium; in air at 20 °C ≈ 343 m/s
  - ລະດັບສຽງ β = 10 log(I/I₀), I₀ = 10⁻¹² W/m²; ເພີ່ມ 10 dB = ແຮງຂຶ້ນ 10 ເທົ່າ | Sound level β = 10 log(I/I₀), I₀ = 10⁻¹² W/m²; +10 dB means 10 times the intensity
  - ຄວາມຖີ່ ກຳນົດລະດັບສູງ-ຕ່ຳ; ແອມພລິຈູດ ກຳນົດຄວາມດັງ | Frequency sets pitch; amplitude sets loudness
  - ທໍ່ປິດປາຍດຽວ f₁ = v/(4L); ແຫຼ່ງເຄື່ອນເຂົ້າຫາ ຄວາມຖີ່ທີ່ໄດ້ຍິນສູງຂຶ້ນ | A closed pipe f₁ = v/(4L); a source approaching raises the heard frequency
- Q:
  - ເຫັນຟ້າແມບ 3 ວິນາທີ ກ່ອນໄດ້ຍິນຟ້າຮ້ອງ ຟ້າຜ່າຫ່າງປະມານເທົ່າໃດ? | Thunder arrives 3 s after the flash: about how far? (about 1 km)
  - ເປັນຫຍັງສຽງລົດພະຍາບານປ່ຽນໄປເມື່ອຜ່ານເຮົາ? | Why does an ambulance siren change pitch as it passes?
- Act: ວັດຄວາມໄວສຽງດ້ວຍການຕົບມື ແລະ ສຽງສະທ້ອນຈາກກຳແພງ ໃນໄລຍະ 50 m | Measure the speed of sound with claps and an echo from a wall 50 m away

#### p7-05 ໄຟຟ້າແມ່ເຫຼັກ (14 h, SIM `induction`, 35 min)
- Obj:
  - ອະທິບາຍທົ່ງແມ່ເຫຼັກ ແລະ ແຮງແມ່ເຫຼັກຕໍ່ກະແສໄຟຟ້າ F = BIL sin θ | Explain the magnetic field and the force on a current F = BIL sin θ
  - ໃຊ້ກົດເກນຟາຣາເດ ε = −NΔΦ/Δt ແລະ ກົດເກນເລນສ໌ | Use Faraday's law ε = −NΔΦ/Δt and Lenz's law
  - ອະທິບາຍການເກີດກະແສໄຟຟ້າສະທ້ອນເອງ ແລະ ພະລັງງານໃນທົ່ງແມ່ເຫຼັກ | Explain self-induction and energy stored in a magnetic field
- Ideas:
  - ກະແສໄຟຟ້າສ້າງທົ່ງແມ່ເຫຼັກ (ກົດມືຂວາ) | A current makes a magnetic field (right-hand rule)
  - ແມ່ເຫຼັກເຄື່ອນໃນຂົດລວດ ເກີດ ε ເມື່ອ ສາຍແຮງທີ່ຕັດຜ່ານປ່ຽນແປງ | A moving magnet induces ε only when the flux through the coil changes
  - ເລນສ໌: ກະແສສະທ້ອນມີທິດຕ້ານການປ່ຽນແປງທີ່ເຮັດໃຫ້ເກີດມັນ | Lenz: the induced current opposes the change that causes it
  - ເຄື່ອງກຳເນີດໄຟຟ້າ ແລະ ມໍເຕີ ໃຊ້ຫຼັກການນີ້ ໃນທິດກັນ | Generators and motors use this principle in opposite directions
- Q:
  - ເປັນຫຍັງແມ່ເຫຼັກທີ່ຢຸດຢູ່ໃນຂົດລວດ ບໍ່ເກີດກະແສໄຟຟ້າ? | Why does a magnet at rest inside a coil induce no current?
  - B = 0.5 T, I = 2 A, L = 0.2 m ຕັ້ງສາກ ແຮງແມ່ເຫຼັກເທົ່າໃດ? | B = 0.5 T, I = 2 A, L = 0.2 m at 90°: what force? (0.2 N)
- Act: ເຄື່ອນແມ່ເຫຼັກເຂົ້າ-ອອກຂົດລວດ ຕໍ່ກັບ LED ຫຼື ເຄື່ອງວັດ ແລະ ປຽບທຽບຄວາມໄວ | Move a magnet in and out of a coil connected to an LED or meter and compare speeds

#### p7-06 ກະແສໄຟຟ້າສະຫຼັບ (13 h, TXT, 30 min)
- Obj:
  - ອະທິບາຍການກຳເນີດກະແສໄຟຟ້າສະຫຼັບ ແລະ ຄ່າ rms | Explain how AC is generated and the rms value
  - ອະທິບາຍວົງຈອນມີຕົວຕ້ານ, ເຄື່ອງຫ້ອນ ແລະ ຂົດລວດ | Describe circuits with a resistor, a capacitor and an inductor
  - ໃຊ້ຫຼັກການໝໍ້ແປງໄຟ Vₛ/Vₚ = Nₛ/Nₚ | Use the transformer relation Vₛ/Vₚ = Nₛ/Nₚ
- Ideas:
  - ຂົດລວດໝູນໃນທົ່ງແມ່ເຫຼັກ: ε = NBAω sin ωt | A coil rotating in a field: ε = NBAω sin ωt
  - V_rms = V_peak/√2 ≈ 0.707 V_peak | V_rms = V_peak/√2 ≈ 0.707 V_peak
  - X_L = ωL ແລະ X_C = 1/(ωC) | X_L = ωL and X_C = 1/(ωC)
  - ໄຟຟ້າສະຫຼັບ ສົ່ງໄກດ້ວຍແຮງດັນສູງ ລຸດການສູນເສຍ (P = I²R) | AC is sent far at high voltage to cut losses (P = I²R)
- Q:
  - ໄຟເຮືອນ 230 V (rms) ຄ່າສູງສຸດເທົ່າໃດ? | Mains 230 V rms: what is the peak? (325 V)
  - ເປັນຫຍັງໝໍ້ແປງໄຟໃຊ້ກັບໄຟຟ້າສະຫຼັບ ແຕ່ບໍ່ໃຊ້ກັບຖ່ານໄຟ? | Why does a transformer work with AC but not with a battery?
- Act: ເບິ່ງແຜ່ນປ້າຍ (nameplate) ຂອງອຸປະກອນໃນເຮືອນ ແລະ ຈົດ V, Hz, W | Read the nameplates of home appliances and note V, Hz and W

#### p7-07 ຄື້ນໄຟຟ້າແມ່ເຫຼັກ (7 h, TXT, 25 min)
- Obj:
  - ອະທິບາຍການກຳເນີດ ແລະ ສະເປັກຕຣຳຂອງຄື້ນໄຟຟ້າແມ່ເຫຼັກ | Explain how EM waves arise and their spectrum
  - ໃຊ້ c = fλ ແລະ ບອກປະໂຫຍດຂອງຄື້ນແຕ່ລະຊ່ວງ | Use c = fλ and state uses of each band
  - ອະທິບາຍການສື່ສານດ້ວຍຄື້ນວິທະຍຸ (ການມອດຄື້ນ) | Explain radio communication (modulation)
- Ideas:
  - ຄື້ນໄຟຟ້າແມ່ເຫຼັກຄື້ນຂວາງ ເດີນທາງໃນສູນຍາກາດ c = 3.00×10⁸ m/s | EM waves are transverse and travel in vacuum at c = 3.00×10⁸ m/s
  - ລຽງຕາມຄວາມຖີ່: ວິທະຍຸ, ໄມໂຄຣເວບ, ອິນຟາເຣດ, ແສງ, ອັນຕຣາໄວໂອເລດ, X, ກາມມາ | By frequency: radio, microwave, infrared, light, ultraviolet, X-ray, gamma
  - ຄວາມຖີ່ສູງ ພະລັງງານໂຟຕອນ E = hf ສູງ ອັນຕະລາຍຫຼາຍ | Higher frequency, higher photon energy E = hf, more hazard
  - ວົງຈອນ LC ສັ່ນທີ່ f = 1/(2π√(LC)) | An LC circuit oscillates at f = 1/(2π√(LC))
- Q:
  - ວິທະຍຸ FM 100 MHz ມີຄວາມຍາວຄື້ນເທົ່າໃດ? | What is the wavelength of 100 MHz FM radio? (3 m)
  - ເປັນຫຍັງໂທລະສັບໃນລິບ/ຫຼືຖ້ຳ ສັນຍານອ່ອນ? | Why is a phone signal weak in a lift or cave?
- Act: ເອົາໂທລະສັບຫໍ່ດ້ວຍແຜ່ນອາລູມີນຽມ ແລ້ວໂທເຂົ້າ ສັງເກດສັນຍານ | Wrap a phone in aluminium foil, call it and observe the signal

#### p7-08 ຄື້ນແສງ (11 h, TXT, 30 min)
- Obj:
  - ອະທິບາຍການກະຈາຍແສງ, ການແຊກແຊງ (Young) ແລະ ການລ້ຽວເບນ | Explain dispersion, Young's interference and diffraction
  - ອະທິບາຍການໂພລາໄຣເຊຊັນ ແລະ ການເຮືອງແສງຂອງທ້ອງຟ້າ (ການກະເຈີງ) | Explain polarisation and the scattering of light by the sky
  - ອະທິບາຍການປະສົມສີ ແລະ ແຜ່ນຕອງແສງ | Explain colour mixing and filters
- Ideas:
  - ແສງຂາວແຍກເປັນສີ ເພາະ n ຕ່າງກັນຕາມຄວາມຍາວຄື້ນ (ປຣິສຶມ, ຮຸ້ງ) | White light splits because n depends on wavelength (prism, rainbow)
  - Young: ໄລຍະຂອບ Δy = λL/d | Young: fringe spacing Δy = λL/d
  - ໂພລາໄຣເຊຊັນ ພິສູດວ່າແສງເປັນຄື້ນຂວາງ | Polarisation proves light is a transverse wave
  - ສີແສງ: ແດງ-ຂຽວ-ຟ້າ ປະສົມເປັນຂາວ; ສີວັດຖຸ ຫັກສີອອກ (subtractive) | Light: red, green, blue mix to white; pigments subtract colours
- Q:
  - ເປັນຫຍັງທ້ອງຟ້າເປັນສີຟ້າ ແລະ ເຫັນຕາເວັນຕົກເປັນສີແດງ? | Why is the sky blue and the sunset red? (scattering)
  - λ = 600 nm, L = 2 m, d = 0.5 mm ໄລຍະຂອບເທົ່າໃດ? | λ = 600 nm, L = 2 m, d = 0.5 mm: fringe spacing? (2.4 mm)
- Act: ເບິ່ງແສງໄຟຜ່ານແຜ່ນ CD ຫຼື ແສງຕາເວັນຜ່ານຈອກນ້ຳ ແລ້ວອະທິບາຍສີ | Look at a lamp reflected from a CD or sunlight through a glass of water and explain the colours

#### p7-09 ຟີຊິກອາໂຕມ (10 h, SIM `photoelectric`, 35 min)
- Obj:
  - ອະທິບາຍແບບຈຳລອງອາໂຕມຂອງ Thomson, Rutherford ແລະ Bohr ແລະ ເສັ້ນສະເປັກຕຣຳ | Describe the Thomson, Rutherford and Bohr models and line spectra
  - ອະທິບາຍປາກົດການໂຟໂຕເອເລັກຕຣິກ ດ້ວຍ E = hf ແລະ K = hf − W₀ | Explain the photoelectric effect with E = hf and K = hf − W₀
  - ໃຊ້ລະດັບພະລັງງານ Eₙ = −13.6/n² eV ຫາຄວາມຍາວຄື້ນຂອງໄຮໂດຣເຈນ | Use Eₙ = −13.6/n² eV to find hydrogen wavelengths
- Ideas:
  - ແສງມາເປັນກ້ອນພະລັງງານ (ໂຟຕອນ) E = hf, h = 6.63×10⁻³⁴ J·s | Light arrives in quanta (photons) E = hf, h = 6.63×10⁻³⁴ J·s
  - ຕ່ຳກວ່າຄວາມຖີ່ເກນ ບໍ່ມີເອເລັກຕຣົງຫຼຸດ ບໍ່ວ່າແສງແຮງເທົ່າໃດ | Below the threshold frequency no electrons are emitted however intense the light
  - ແສງແຮງຂຶ້ນ ເອເລັກຕຣົງຫຼາຍຂຶ້ນ ແຕ່ K ສູງສຸດບໍ່ປ່ຽນ | More intensity gives more electrons but the same maximum K
  - ໂຟຕອນທີ່ເກີດຈາກການກະໂດດຊັ້ນພະລັງງານ ມີ E = Eᵢ − E_f | A photon from a level jump has E = Eᵢ − E_f
- Q:
  - ເປັນຫຍັງແສງອິນຟາເຣດທີ່ແຮງຫຼາຍ ບໍ່ສາມາດຕີເອເລັກຕຣົງອອກຈາກໂລຫະໄດ້? | Why can intense infrared light not eject electrons from a metal?
  - ການຫຼຸດ n = 3 ເປັນ n = 2 ຂອງໄຮໂດຣເຈນ ຄື້ນມີສີໃດ ແລະ ຍາວເທົ່າໃດ? | The n = 3 → 2 jump in hydrogen: what colour and wavelength? (red, 656 nm)
- Act: ເບິ່ງຫຼອດໄຟ (neon, ໄຮໂດຣເຈນ) ຜ່ານແຜ່ນເກຣຕິງ ແລະ ບັນທຶກເສັ້ນສະເປັກຕຣຳ (ຄູສາທິດ) | View discharge lamps through a diffraction grating and record the lines (teacher demo)

#### p7-10 ຟີຊິກນິວເຄຼຍ (10 h, TXT, 30 min)
- Obj:
  - ອະທິບາຍກຳມັນຕະພາບລັງສີ ແລະ ລັງສີ α, β, γ | Explain radioactivity and α, β, γ radiation
  - ໃຊ້ເຄິ່ງຊີວິດ N = N₀(½)^(t/T½) ແລະ ອະທິບາຍໄອໂຊໂທບ | Use half-life N = N₀(½)^(t/T½) and explain isotopes
  - ອະທິບາຍການແຍກ ແລະ ການລວມນິວເຄຼຍ ແລະ ພະລັງງານສາຍພັນ E = mc² | Explain fission, fusion and binding energy E = mc²
- Ideas:
  - ເລກອາໂຕມ Z = ໂປຣຕົງ; ເລກມວນສານ A = ໂປຣຕົງ + ນິວຕຣົງ | Atomic number Z = protons; mass number A = protons + neutrons
  - α ຖືກກັ້ນດ້ວຍເຈ້ຍ, β ດ້ວຍອາລູມີນຽມ, γ ຕ້ອງໃຊ້ຕະກົ່ວໜາ | α is stopped by paper, β by aluminium, γ needs thick lead
  - ເຄິ່ງຊີວິດ: ເວລາທີ່ເຫຼືອເຄິ່ງໜຶ່ງ ບໍ່ຂຶ້ນກັບປະລິມານ | Half-life: time for half to remain, independent of the amount
  - ປະຕິກິລິຍາໃນໂຮງງານນິວເຄຼຍ ແລະ ດວງອາທິດ ມີທັງແຍກ ແລະ ລວມ | Reactors use fission; the Sun uses fusion
- Q:
  - ໄອໂອດີນ-131 ເຄິ່ງຊີວິດ 8 ວັນ ຫຼັງ 24 ວັນ ເຫຼືອເທົ່າໃດ? | Iodine-131 has half-life 8 days; how much remains after 24 days? (1/8)
  - ມວນ 1 g ກາຍເປັນພະລັງງານທັງໝົດ ໄດ້ເທົ່າໃດ J? | If 1 g of mass is fully converted to energy, how many joules? (9×10¹³ J)
- Act: ຈຳລອງເຄິ່ງຊີວິດດ້ວຍເຫຼຍ 100 ເມັດ: ໂຍນ ແລະ ເອົາຝ່າຍທີ່ໄດ້ຫົວອອກ ເຮັດຊ້ຳ ແລ້ວແຕ້ມກຣາຟ | Model half-life with 100 coins: toss, remove heads, repeat and plot the counts
