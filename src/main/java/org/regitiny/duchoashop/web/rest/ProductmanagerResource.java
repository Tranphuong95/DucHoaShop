package org.regitiny.duchoashop.web.rest;

import org.regitiny.duchoashop.domain.Productmanager;
import org.regitiny.duchoashop.repository.ProductmanagerRepository;
import org.regitiny.duchoashop.repository.search.ProductmanagerSearchRepository;
import org.regitiny.duchoashop.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link org.regitiny.duchoashop.domain.Productmanager}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProductmanagerResource {

    private final Logger log = LoggerFactory.getLogger(ProductmanagerResource.class);

    private static final String ENTITY_NAME = "productmanager";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductmanagerRepository productmanagerRepository;

    private final ProductmanagerSearchRepository productmanagerSearchRepository;

    public ProductmanagerResource(ProductmanagerRepository productmanagerRepository, ProductmanagerSearchRepository productmanagerSearchRepository) {
        this.productmanagerRepository = productmanagerRepository;
        this.productmanagerSearchRepository = productmanagerSearchRepository;
    }

    /**
     * {@code POST  /productmanagers} : Create a new productmanager.
     *
     * @param productmanager the productmanager to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productmanager, or with status {@code 400 (Bad Request)} if the productmanager has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/productmanagers")
    public ResponseEntity<Productmanager> createProductmanager(@RequestBody Productmanager productmanager) throws URISyntaxException {
        log.debug("REST request to save Productmanager : {}", productmanager);
        if (productmanager.getId() != null) {
            throw new BadRequestAlertException("A new productmanager cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Productmanager result = productmanagerRepository.save(productmanager);
        productmanagerSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/productmanagers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /productmanagers} : Updates an existing productmanager.
     *
     * @param productmanager the productmanager to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productmanager,
     * or with status {@code 400 (Bad Request)} if the productmanager is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productmanager couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/productmanagers")
    public ResponseEntity<Productmanager> updateProductmanager(@RequestBody Productmanager productmanager) throws URISyntaxException {
        log.debug("REST request to update Productmanager : {}", productmanager);
        if (productmanager.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Productmanager result = productmanagerRepository.save(productmanager);
        productmanagerSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productmanager.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /productmanagers} : get all the productmanagers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productmanagers in body.
     */
    @GetMapping("/productmanagers")
    public List<Productmanager> getAllProductmanagers() {
        log.debug("REST request to get all Productmanagers");
        return productmanagerRepository.findAll();
    }

    /**
     * {@code GET  /productmanagers/:id} : get the "id" productmanager.
     *
     * @param id the id of the productmanager to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productmanager, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/productmanagers/{id}")
    public ResponseEntity<Productmanager> getProductmanager(@PathVariable Long id) {
        log.debug("REST request to get Productmanager : {}", id);
        Optional<Productmanager> productmanager = productmanagerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productmanager);
    }

    /**
     * {@code DELETE  /productmanagers/:id} : delete the "id" productmanager.
     *
     * @param id the id of the productmanager to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/productmanagers/{id}")
    public ResponseEntity<Void> deleteProductmanager(@PathVariable Long id) {
        log.debug("REST request to delete Productmanager : {}", id);
        productmanagerRepository.deleteById(id);
        productmanagerSearchRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/productmanagers?query=:query} : search for the productmanager corresponding
     * to the query.
     *
     * @param query the query of the productmanager search.
     * @return the result of the search.
     */
    @GetMapping("/_search/productmanagers")
    public List<Productmanager> searchProductmanagers(@RequestParam String query) {
        log.debug("REST request to search Productmanagers for query {}", query);
        return StreamSupport
            .stream(productmanagerSearchRepository.search(queryStringQuery(query)).spliterator(), false)
        .collect(Collectors.toList());
    }
}
